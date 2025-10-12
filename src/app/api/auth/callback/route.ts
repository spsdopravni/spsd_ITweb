/**
 * Microsoft OAuth Callback Route
 * GET /api/auth/callback
 *
 * Handles Microsoft OAuth callback after user authentication
 */

import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { completeMicrosoftOAuth, validateState } from '@/lib/auth/microsoft-oauth';
import { generateTokenPair } from '@/lib/auth/jwt';
import { generateFriendlyPassword } from '@/lib/utils/password-generator';
import { prisma } from '@/lib/db/prisma';
import bcrypt from 'bcryptjs';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const code = searchParams.get('code');
  const state = searchParams.get('state');
  const error = searchParams.get('error');

  try {
    // Handle OAuth errors
    if (error) {
      console.error('Microsoft OAuth error:', error);
      return NextResponse.redirect(
        new URL(`/login?error=${encodeURIComponent('Microsoft login failed')}`, request.url)
      );
    }

    // Validate required parameters
    if (!code || !state) {
      return NextResponse.redirect(
        new URL('/login?error=missing_parameters', request.url)
      );
    }

    // Validate CSRF state
    const cookieStore = await cookies();
    const storedState = cookieStore.get('oauth_state')?.value;

    if (!storedState || !validateState(state, storedState)) {
      return NextResponse.redirect(
        new URL('/login?error=invalid_state', request.url)
      );
    }

    // Exchange code for user info
    const microsoftUser = await completeMicrosoftOAuth(code);

    // Check if user exists
    let user = await prisma.user.findUnique({
      where: { microsoftId: microsoftUser.id },
    });

    let isFirstLogin = false;
    let generatedPassword: string | null = null;

    if (!user) {
      // First time login - create new user with generated password
      isFirstLogin = true;
      generatedPassword = generateFriendlyPassword();
      const passwordHash = await bcrypt.hash(generatedPassword, 12);

      user = await prisma.user.create({
        data: {
          microsoftId: microsoftUser.id,
          email: microsoftUser.email,
          username: microsoftUser.username,
          displayName: microsoftUser.displayName,
          firstName: microsoftUser.givenName || undefined,
          lastName: microsoftUser.surname || undefined,
          passwordHash,
          role: 'STUDENT',
          isActive: true,
          isVerified: true,
        },
      });

      // Log account creation
      await prisma.auditLog.create({
        data: {
          userId: user.id,
          action: 'ACCOUNT_CREATED',
          resource: 'user',
          description: `New user created via Microsoft OAuth: ${user.email}`,
          ipAddress: request.headers.get('x-forwarded-for') || 'unknown',
          userAgent: request.headers.get('user-agent') || undefined,
          success: true,
        },
      });
    } else {
      // Existing user - update last login
      await prisma.user.update({
        where: { id: user.id },
        data: {
          lastLogin: new Date(),
          failedLoginAttempts: 0,
          lockedUntil: null,
        },
      });
    }

    // Generate JWT tokens
    const tokens = await generateTokenPair({
      userId: user.id,
      username: user.username,
      email: user.email,
      role: user.role,
    });

    // Create session
    await prisma.session.create({
      data: {
        userId: user.id,
        accessToken: tokens.accessToken,
        refreshToken: tokens.refreshToken,
        expiresAt: tokens.expiresAt,
        ipAddress: request.headers.get('x-forwarded-for') || undefined,
        userAgent: request.headers.get('user-agent') || undefined,
      },
    });

    // Log successful login
    await prisma.auditLog.create({
      data: {
        userId: user.id,
        action: 'MICROSOFT_AUTH_SUCCESS',
        resource: 'auth',
        description: `User logged in via Microsoft OAuth: ${user.email}`,
        ipAddress: request.headers.get('x-forwarded-for') || 'unknown',
        userAgent: request.headers.get('user-agent') || undefined,
        success: true,
      },
    });

    // Create response
    const response = NextResponse.redirect(new URL('/dashboard', request.url));

    // Set auth cookies
    response.cookies.set('accessToken', tokens.accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 15 * 60, // 15 minutes
      path: '/',
    });

    response.cookies.set('refreshToken', tokens.refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 7 * 24 * 60 * 60, // 7 days
      path: '/',
    });

    // Clear OAuth state cookie
    response.cookies.delete('oauth_state');

    // If first login, store generated password in a temporary cookie
    // (will be shown in popup on dashboard)
    if (isFirstLogin && generatedPassword) {
      response.cookies.set('temp_password', generatedPassword, {
        httpOnly: false, // Client needs to read this
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 300, // 5 minutes
        path: '/',
      });

      response.cookies.set('show_password_popup', 'true', {
        httpOnly: false,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 300,
        path: '/',
      });
    }

    return response;
  } catch (error) {
    console.error('OAuth callback error:', error);

    // Log failed login
    try {
      await prisma.auditLog.create({
        data: {
          action: 'MICROSOFT_AUTH_FAILED',
          resource: 'auth',
          description: `Microsoft OAuth failed: ${error instanceof Error ? error.message : 'Unknown error'}`,
          ipAddress: request.headers.get('x-forwarded-for') || 'unknown',
          userAgent: request.headers.get('user-agent') || undefined,
          success: false,
          error: error instanceof Error ? error.message : 'Unknown error',
        },
      });
    } catch (logError) {
      console.error('Failed to log error:', logError);
    }

    return NextResponse.redirect(
      new URL(`/login?error=${encodeURIComponent('Authentication failed')}`, request.url)
    );
  }
}
