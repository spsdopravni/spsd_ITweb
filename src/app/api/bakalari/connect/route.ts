/**
 * Bakaláři Connection API
 * POST /api/bakalari/connect
 *
 * Connects user's Bakaláři account by authenticating and storing tokens
 */

import { NextRequest, NextResponse } from 'next/server';
import { verifyAccessToken } from '@/lib/auth/jwt';
import { prisma } from '@/lib/db/prisma';
import { createBakalariClient } from '@/lib/bakalari/bakalari-client';
import crypto from 'crypto';

const ENCRYPTION_KEY = Buffer.from(process.env.ENCRYPTION_KEY || '', 'hex');
const IV_LENGTH = 16;
const ALGORITHM = 'aes-256-cbc';

// Encrypt sensitive data
function encrypt(text: string): string {
  if (!ENCRYPTION_KEY || ENCRYPTION_KEY.length !== 32) {
    throw new Error('Invalid encryption key');
  }
  const iv = crypto.randomBytes(IV_LENGTH);
  const cipher = crypto.createCipheriv(ALGORITHM, ENCRYPTION_KEY, iv);
  let encrypted = cipher.update(text, 'utf8', 'hex');
  encrypted += cipher.final('hex');
  return iv.toString('hex') + ':' + encrypted;
}

export async function POST(request: NextRequest) {
  try {
    // 1. Verify authentication
    const accessToken = request.cookies.get('accessToken')?.value;

    if (!accessToken) {
      return NextResponse.json({ error: 'Unauthorized', details: 'No access token' }, { status: 401 });
    }

    const tokenPayload = await verifyAccessToken(accessToken);

    if (!tokenPayload) {
      return NextResponse.json({ error: 'Invalid token', details: 'Token verification failed' }, { status: 401 });
    }

    // 2. Get user from database
    const user = await prisma.user.findUnique({
      where: { id: tokenPayload.userId },
    });

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    // 3. Parse request body
    const body = await request.json();
    const { username, password } = body;

    if (!username || !password) {
      return NextResponse.json(
        { error: 'Username and password required' },
        { status: 400 }
      );
    }

    // 4. Authenticate with Bakaláři
    const bakalariClient = createBakalariClient();

    try {
      const authResponse = await bakalariClient.authenticate(username, password);

      // 5. Store encrypted credentials and tokens in database
      await prisma.user.update({
        where: { id: user.id },
        data: {
          bakalariUsername: username,
          bakalariPasswordEnc: encrypt(password),
          bakalariAccessToken: authResponse.access_token,
          bakalariRefreshToken: authResponse.refresh_token,
          bakalariConnected: true,
        },
      });

      // 6. Log successful connection
      await prisma.auditLog.create({
        data: {
          userId: user.id,
          action: 'DATA_CREATED',
          resource: 'bakalari_connection',
          description: 'User connected Bakaláři account successfully',
          success: true,
          ipAddress: request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip') || 'unknown',
          userAgent: request.headers.get('user-agent') || undefined,
        },
      });

      return NextResponse.json({
        success: true,
        message: 'Bakaláři account connected successfully',
      });
    } catch (bakalariError: unknown) {
      const errorMessage = bakalariError instanceof Error ? bakalariError.message : 'Unknown error';

      // Log failed connection attempt
      await prisma.auditLog.create({
        data: {
          userId: user.id,
          action: 'UNAUTHORIZED_ACCESS',
          resource: 'bakalari_connection',
          description: `Failed to connect Bakaláři account: ${errorMessage}`,
          success: false,
          error: errorMessage,
          ipAddress: request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip') || 'unknown',
          userAgent: request.headers.get('user-agent') || undefined,
        },
      });

      return NextResponse.json(
        {
          error: 'Failed to authenticate with Bakaláři. Please check your credentials.',
          details: errorMessage,
        },
        { status: 401 }
      );
    }
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';

    return NextResponse.json(
      { error: 'Internal server error', details: errorMessage },
      { status: 500 }
    );
  }
}
