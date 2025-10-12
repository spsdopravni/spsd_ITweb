/**
 * Change Password Route
 * POST /api/auth/change-password
 *
 * Allows authenticated users to change their password
 */

import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db/prisma';
import { verifyAccessToken } from '@/lib/auth/jwt';
import bcrypt from 'bcryptjs';
import { z } from 'zod';

// Validation schema
const changePasswordSchema = z.object({
  currentPassword: z.string().min(1, 'Current password is required'),
  newPassword: z.string().min(8, 'New password must be at least 8 characters'),
  confirmPassword: z.string().min(1, 'Confirm password is required'),
}).refine((data) => data.newPassword === data.confirmPassword, {
  message: 'Passwords do not match',
  path: ['confirmPassword'],
});

export async function POST(request: NextRequest) {
  try {
    // Get access token from cookie
    const accessToken = request.cookies.get('accessToken')?.value;

    if (!accessToken) {
      return NextResponse.json(
        { error: 'Nejste přihlášeni' },
        { status: 401 }
      );
    }

    // Verify token and get user info
    const payload = await verifyAccessToken(accessToken);

    // Parse and validate request body
    const body = await request.json();
    const validation = changePasswordSchema.safeParse(body);

    if (!validation.success) {
      return NextResponse.json(
        { error: validation.error.issues[0].message },
        { status: 400 }
      );
    }

    const { currentPassword, newPassword } = validation.data;

    // Get user from database
    const user = await prisma.user.findUnique({
      where: { id: payload.userId },
    });

    if (!user) {
      return NextResponse.json(
        { error: 'Uživatel nenalezen' },
        { status: 404 }
      );
    }

    // Verify current password
    const isPasswordValid = await bcrypt.compare(currentPassword, user.passwordHash);

    if (!isPasswordValid) {
      // Log failed attempt
      await prisma.auditLog.create({
        data: {
          userId: user.id,
          action: 'PASSWORD_CHANGED',
          resource: 'password',
          description: 'Password change failed: Invalid current password',
          ipAddress: request.headers.get('x-forwarded-for') || 'unknown',
          userAgent: request.headers.get('user-agent') || undefined,
          success: false,
        },
      });

      return NextResponse.json(
        { error: 'Současné heslo je nesprávné' },
        { status: 401 }
      );
    }

    // Check if new password is different
    const isSamePassword = await bcrypt.compare(newPassword, user.passwordHash);
    if (isSamePassword) {
      return NextResponse.json(
        { error: 'Nové heslo musí být odlišné od současného' },
        { status: 400 }
      );
    }

    // Hash new password
    const newPasswordHash = await bcrypt.hash(newPassword, 12);

    // Update password in database
    await prisma.user.update({
      where: { id: user.id },
      data: {
        passwordHash: newPasswordHash,
        passwordChangedAt: new Date(),
      },
    });

    // Log successful password change
    await prisma.auditLog.create({
      data: {
        userId: user.id,
        action: 'PASSWORD_CHANGED',
        resource: 'password',
        description: 'Password changed successfully',
        ipAddress: request.headers.get('x-forwarded-for') || 'unknown',
        userAgent: request.headers.get('user-agent') || undefined,
        success: true,
      },
    });

    return NextResponse.json({
      success: true,
      message: 'Heslo bylo úspěšně změněno',
    });
  } catch (error) {
    console.error('Password change error:', error);

    return NextResponse.json(
      { error: 'Chyba při změně hesla. Zkuste to prosím později.' },
      { status: 500 }
    );
  }
}
