/**
 * Bakaláři Status API
 * GET /api/bakalari/status
 *
 * Checks if user has connected their Bakaláři account
 */

import { NextRequest, NextResponse } from 'next/server';
import { verifyAccessToken } from '@/lib/auth/jwt';
import { prisma } from '@/lib/db/prisma';

export async function GET(request: NextRequest) {
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
        bakalariConnected: true,
        bakalariUsername: true,
        bakalariLastSync: true,
      },
    });

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    // 3. Return connection status
    return NextResponse.json({
      connected: user.bakalariConnected,
      username: user.bakalariUsername || null,
      lastSync: user.bakalariLastSync || null,
    });
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    console.error('Bakaláři status check error:', error);

    return NextResponse.json(
      { error: 'Internal server error', details: errorMessage },
      { status: 500 }
    );
  }
}
