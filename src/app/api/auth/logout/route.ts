/**
 * Logout Route
 * POST /api/auth/logout
 *
 * Handles user logout - deletes session and clears cookies
 */

import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db/prisma';
import { verifyAccessToken } from '@/lib/auth/jwt';

export async function POST(request: NextRequest) {
  try {
    // Get access token from cookie
    const accessToken = request.cookies.get('accessToken')?.value;

    if (accessToken) {
      try {
        // Verify token and get user info
        const payload = await verifyAccessToken(accessToken);

        // Delete session from database
        await prisma.session.deleteMany({
          where: {
            accessToken,
            userId: payload.userId,
          },
        });

        // Log logout
        await prisma.auditLog.create({
          data: {
            userId: payload.userId,
            action: 'LOGOUT',
            resource: 'auth',
            description: `User logged out: ${payload.email}`,
            ipAddress: request.headers.get('x-forwarded-for') || 'unknown',
            userAgent: request.headers.get('user-agent') || undefined,
            success: true,
          },
        });
      } catch (error) {
        // Token invalid or expired - just continue with logout
        console.error('Token verification failed during logout:', error);
      }
    }

    // Create response
    const response = NextResponse.json({ success: true });

    // Clear auth cookies
    response.cookies.delete('accessToken');
    response.cookies.delete('refreshToken');
    response.cookies.delete('temp_password');
    response.cookies.delete('show_password_popup');

    return response;
  } catch (error) {
    console.error('Logout error:', error);
    return NextResponse.json(
      { error: 'Chyba při odhlašování' },
      { status: 500 }
    );
  }
}
