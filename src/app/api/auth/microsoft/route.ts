/**
 * Microsoft OAuth Initiation Route
 * GET /api/auth/microsoft
 *
 * Redirects user to Microsoft login page
 */

import { NextRequest, NextResponse } from 'next/server';
import { generateAuthorizationUrl, generateState } from '@/lib/auth/microsoft-oauth';
import { cookies } from 'next/headers';

export async function GET(_request: NextRequest) {
  try {
    // Generate CSRF state token
    const state = generateState();

    // Store state in cookie for validation in callback
    const cookieStore = await cookies();
    cookieStore.set('oauth_state', state, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 600, // 10 minutes
      path: '/',
    });

    // Generate Microsoft authorization URL
    const authUrl = generateAuthorizationUrl(state);

    // Redirect to Microsoft login
    return NextResponse.redirect(authUrl);
  } catch (error) {
    console.error('Microsoft OAuth initiation error:', error);
    return NextResponse.json(
      { error: 'Failed to initiate Microsoft login' },
      { status: 500 }
    );
  }
}
