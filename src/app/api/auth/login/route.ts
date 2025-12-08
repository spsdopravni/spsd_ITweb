/**
 * Username + Password Login Route
 * POST /api/auth/login
 *
 * Handles login with username and password (after first Microsoft OAuth)
 */

import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db/prisma';
import { generateTokenPair } from '@/lib/auth/jwt';
import bcrypt from 'bcryptjs';
import { z } from 'zod';

// Validation schema - accepts username or email
const loginSchema = z.object({
  username: z.string().min(1, 'Username or email is required'),
  password: z.string().min(1, 'Password is required'),
});

// Rate limiting map (in production, use Redis)
const rateLimitMap = new Map<string, { count: number; resetAt: number }>();

function checkRateLimit(ip: string, maxAttempts = 5, windowMs = 15 * 60 * 1000): boolean {
  const now = Date.now();
  const record = rateLimitMap.get(ip);

  if (!record || now > record.resetAt) {
    rateLimitMap.set(ip, { count: 1, resetAt: now + windowMs });
    return true;
  }

  if (record.count >= maxAttempts) {
    return false;
  }

  record.count++;
  return true;
}

export async function POST(request: NextRequest) {
  const ip = request.headers.get('x-forwarded-for') || 'unknown';

  try {
    // Rate limiting
    if (!checkRateLimit(ip)) {
      return NextResponse.json(
        { error: 'Příliš mnoho pokusů. Zkuste to prosím za 15 minut.' },
        { status: 429 }
      );
    }

    // Parse and validate request body
    const body = await request.json();
    const validation = loginSchema.safeParse(body);

    if (!validation.success) {
      return NextResponse.json(
        { error: 'Neplatné přihlašovací údaje' },
        { status: 400 }
      );
    }

    const { username, password } = validation.data;

    // Find user by username or email
    const user = await prisma.user.findFirst({
      where: {
        OR: [
          { username: username.toLowerCase() },
          { email: username.toLowerCase() },
        ],
      },
    });

    if (!user) {
      // Log failed attempt
      await prisma.auditLog.create({
        data: {
          action: 'LOGIN_FAILED',
          resource: 'auth',
          description: `Login failed: User not found (${username})`,
          ipAddress: ip,
          userAgent: request.headers.get('user-agent') || undefined,
          success: false,
        },
      });

      return NextResponse.json(
        { error: 'Nesprávné uživatelské jméno nebo heslo' },
        { status: 401 }
      );
    }

    // Check if account is locked
    if (user.lockedUntil && user.lockedUntil > new Date()) {
      const minutesLeft = Math.ceil((user.lockedUntil.getTime() - Date.now()) / 60000);
      return NextResponse.json(
        {
          error: `Účet je dočasně zamčen. Zkuste to prosím za ${minutesLeft} minut.`,
        },
        { status: 429 }
      );
    }

    // Check if account is active
    if (!user.isActive) {
      return NextResponse.json(
        { error: 'Účet je deaktivován. Kontaktujte správce.' },
        { status: 403 }
      );
    }

    // Verify password
    const isPasswordValid = await bcrypt.compare(password, user.passwordHash);

    if (!isPasswordValid) {
      // Increment failed attempts
      const newFailedAttempts = user.failedLoginAttempts + 1;
      const shouldLock = newFailedAttempts >= 5;

      await prisma.user.update({
        where: { id: user.id },
        data: {
          failedLoginAttempts: newFailedAttempts,
          lockedUntil: shouldLock
            ? new Date(Date.now() + 15 * 60 * 1000) // Lock for 15 minutes
            : null,
        },
      });

      // Log failed attempt
      await prisma.auditLog.create({
        data: {
          userId: user.id,
          action: 'LOGIN_FAILED',
          resource: 'auth',
          description: `Login failed: Invalid password (attempt ${newFailedAttempts}/5)`,
          ipAddress: ip,
          userAgent: request.headers.get('user-agent') || undefined,
          success: false,
        },
      });

      return NextResponse.json(
        {
          error: shouldLock
            ? 'Příliš mnoho neúspěšných pokusů. Účet byl zamčen na 15 minut.'
            : 'Nesprávné uživatelské jméno nebo heslo',
        },
        { status: 401 }
      );
    }

    // Successful login - reset failed attempts and update last login
    await prisma.user.update({
      where: { id: user.id },
      data: {
        failedLoginAttempts: 0,
        lockedUntil: null,
        lastLogin: new Date(),
      },
    });

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
        ipAddress: ip,
        userAgent: request.headers.get('user-agent') || undefined,
      },
    });

    // Log successful login
    await prisma.auditLog.create({
      data: {
        userId: user.id,
        action: 'LOGIN_SUCCESS',
        resource: 'auth',
        description: `User logged in successfully: ${user.email}`,
        ipAddress: ip,
        userAgent: request.headers.get('user-agent') || undefined,
        success: true,
      },
    });

    // Create response
    const response = NextResponse.json({
      success: true,
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
        displayName: user.displayName,
        firstName: user.firstName,
        lastName: user.lastName,
        role: user.role,
      },
    });

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

    return response;
  } catch (error) {
    console.error('Login error:', error);

    // Log error
    try {
      await prisma.auditLog.create({
        data: {
          action: 'LOGIN_FAILED',
          resource: 'auth',
          description: `Login error: ${error instanceof Error ? error.message : 'Unknown error'}`,
          ipAddress: ip,
          userAgent: request.headers.get('user-agent') || undefined,
          success: false,
          error: error instanceof Error ? error.message : 'Unknown error',
        },
      });
    } catch (logError) {
      console.error('Failed to log error:', logError);
    }

    return NextResponse.json(
      { error: 'Chyba při přihlašování. Zkuste to prosím později.' },
      { status: 500 }
    );
  }
}
