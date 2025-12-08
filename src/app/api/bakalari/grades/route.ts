/**
 * Bakaláři Grades API Route
 * GET /api/bakalari/grades
 *
 * Fetches student grades from Bakaláři system.
 * Requires authentication.
 */

import { NextRequest, NextResponse } from 'next/server';
import { verifyAccessToken } from '@/lib/auth/jwt';
import { prisma } from '@/lib/db/prisma';

export async function GET(request: NextRequest) {
  try {
    // 1. Verify JWT token from cookie
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
    });

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    // 3. Admin-only access check (Testing Interface)
    if (user.role !== 'ADMIN') {
      // Log unauthorized access attempt
      await prisma.auditLog.create({
        data: {
          userId: user.id,
          action: 'UNAUTHORIZED_ACCESS',
          resource: 'bakalari_grades',
          description: `Non-admin user (${user.role}) attempted to access Bakaláři testing interface`,
          success: false,
          ipAddress: request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip') || 'unknown',
          userAgent: request.headers.get('user-agent') || undefined,
          method: 'GET',
          path: '/api/bakalari/grades',
          statusCode: 403,
        },
      });

      return NextResponse.json(
        {
          error: 'Forbidden',
          message: 'This is a testing interface. Admin access required.',
        },
        { status: 403 }
      );
    }

    // 4. TODO: Get Bakaláři credentials from user record or session
    // For now, return placeholder response
    // In production, you'll need to:
    // - Store Bakaláři credentials securely (encrypted)
    // - Or prompt user to connect their Bakaláři account
    // - Or use school-wide API key if available

    /**
     * Example implementation (when Bakaláři credentials are available):
     *
     * const bakalariClient = createBakalariClient(
     *   user.bakalariAccessToken,
     *   user.bakalariRefreshToken
     * );
     *
     * const grades = await bakalariClient.getGrades();
     *
     * // Log API access
     * await prisma.auditLog.create({
     *   data: {
     *     userId: user.id,
     *     action: 'DATA_READ',
     *     resource: 'bakalari_grades',
     *     success: true,
     *   },
     * });
     *
     * return NextResponse.json({ success: true, data: grades });
     */

    // 5. Return mock response for now (Testing Interface)
    return NextResponse.json({
      success: true,
      message: 'Bakaláři integration pending',
      data: {
        mockData: true,
        grades: [],
        note: 'Connect your Bakaláři account to see real data',
      },
    });
  } catch (error) {
    console.error('Bakaláři grades API error:', error);

    // Log failed attempt
    await prisma.auditLog.create({
      data: {
        action: 'DATA_READ',
        resource: 'bakalari_grades',
        description: `Failed to fetch grades: ${error}`,
        success: false,
      },
    });

    return NextResponse.json(
      { error: 'Failed to fetch grades', success: false },
      { status: 500 }
    );
  }
}
