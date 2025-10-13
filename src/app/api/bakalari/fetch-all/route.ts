/**
 * Bakaláři Fetch All Data API
 * POST /api/bakalari/fetch-all
 *
 * Fetches all available data from Bakaláři for the authenticated user
 */

import { NextRequest, NextResponse } from 'next/server';
import { verifyAccessToken } from '@/lib/auth/jwt';
import { prisma } from '@/lib/db/prisma';
import { createBakalariClient } from '@/lib/bakalari/bakalari-client';

export async function POST(request: NextRequest) {
  try {
    // 1. Verify authentication
    const accessToken = request.cookies.get('accessToken')?.value;
    if (!accessToken) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const tokenPayload = await verifyAccessToken(accessToken);
    if (!tokenPayload) {
      return NextResponse.json({ error: 'Invalid token' }, { status: 401 });
    }

    // 2. Get user from database
    const user = await prisma.user.findUnique({
      where: { id: tokenPayload.userId },
      select: {
        id: true,
        bakalariAccessToken: true,
        bakalariRefreshToken: true,
        bakalariConnected: true,
      },
    });

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    if (!user.bakalariConnected || !user.bakalariAccessToken) {
      return NextResponse.json(
        { error: 'Bakaláři account not connected. Please connect first.' },
        { status: 400 }
      );
    }

    // 3. Create Bakaláři client with stored tokens
    const bakalariClient = createBakalariClient(
      user.bakalariAccessToken ?? undefined,
      user.bakalariRefreshToken ?? undefined
    );

    // 4. Fetch all available data
    try {
      const allData = await bakalariClient.fetchAllData();

      // 5. Update last sync time
      await prisma.user.update({
        where: { id: user.id },
        data: {
          bakalariLastSync: new Date(),
        },
      });

      // 6. Log data fetch
      await prisma.auditLog.create({
        data: {
          userId: user.id,
          action: 'DATA_READ',
          resource: 'bakalari_all_data',
          description: 'User fetched all Bakaláři data',
          success: true,
          ipAddress: request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip') || 'unknown',
          userAgent: request.headers.get('user-agent') || undefined,
        },
      });

      // 7. Return data
      return NextResponse.json({
        success: true,
        data: allData,
        timestamp: new Date().toISOString(),
      });
    } catch (bakalariError: unknown) {
      const errorMessage = bakalariError instanceof Error ? bakalariError.message : 'Unknown error';
      // Log failed fetch attempt
      await prisma.auditLog.create({
        data: {
          userId: user.id,
          action: 'DATA_READ',
          resource: 'bakalari_all_data',
          description: `Failed to fetch Bakaláři data: ${errorMessage}`,
          success: false,
          error: errorMessage,
          ipAddress: request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip') || 'unknown',
          userAgent: request.headers.get('user-agent') || undefined,
        },
      });

      return NextResponse.json(
        {
          error: 'Failed to fetch data from Bakaláři',
          details: errorMessage,
        },
        { status: 500 }
      );
    }
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    console.error('Bakaláři fetch-all error:', error);

    return NextResponse.json(
      { error: 'Internal server error', details: errorMessage },
      { status: 500 }
    );
  }
}
