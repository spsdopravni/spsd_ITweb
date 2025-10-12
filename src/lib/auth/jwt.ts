/**
 * JWT Token Management
 * Handles creation and validation of JWT tokens for authentication
 */

import { SignJWT, jwtVerify } from 'jose';

const JWT_SECRET = new TextEncoder().encode(
  process.env.JWT_SECRET || 'your-super-secret-jwt-key-min-32-characters-long'
);

const JWT_REFRESH_SECRET = new TextEncoder().encode(
  process.env.JWT_REFRESH_SECRET || 'your-refresh-secret-key-min-32-characters-long'
);

// Token expiration times
const ACCESS_TOKEN_EXPIRY = '15m'; // 15 minutes
const REFRESH_TOKEN_EXPIRY = '7d'; // 7 days

export interface TokenPayload {
  userId: string;
  username: string;
  email: string;
  role?: string;
}

export interface TokenPair {
  accessToken: string;
  refreshToken: string;
  expiresAt: Date;
}

/**
 * Generate access token (short-lived)
 */
export async function generateAccessToken(payload: TokenPayload): Promise<string> {
  const token = await new SignJWT({
    sub: payload.userId,
    username: payload.username,
    email: payload.email,
    role: payload.role || 'student',
    type: 'access',
  })
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime(ACCESS_TOKEN_EXPIRY)
    .setIssuer('spsd-itweb')
    .setAudience('spsd-students')
    .sign(JWT_SECRET);

  return token;
}

/**
 * Generate refresh token (long-lived)
 */
export async function generateRefreshToken(payload: TokenPayload): Promise<string> {
  const token = await new SignJWT({
    sub: payload.userId,
    username: payload.username,
    type: 'refresh',
  })
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime(REFRESH_TOKEN_EXPIRY)
    .setIssuer('spsd-itweb')
    .setAudience('spsd-students')
    .sign(JWT_REFRESH_SECRET);

  return token;
}

/**
 * Generate both access and refresh tokens
 */
export async function generateTokenPair(payload: TokenPayload): Promise<TokenPair> {
  const accessToken = await generateAccessToken(payload);
  const refreshToken = await generateRefreshToken(payload);

  // Calculate expiry time (15 minutes from now)
  const expiresAt = new Date(Date.now() + 15 * 60 * 1000);

  return {
    accessToken,
    refreshToken,
    expiresAt,
  };
}

/**
 * Verify access token
 */
export async function verifyAccessToken(token: string): Promise<TokenPayload> {
  try {
    const { payload } = await jwtVerify(token, JWT_SECRET, {
      issuer: 'spsd-itweb',
      audience: 'spsd-students',
    });

    if (payload.type !== 'access') {
      throw new Error('Invalid token type');
    }

    return {
      userId: payload.sub as string,
      username: payload.username as string,
      email: payload.email as string,
      role: payload.role as string,
    };
  } catch (_error) {
    throw new Error('Invalid or expired access token');
  }
}

/**
 * Verify refresh token
 */
export async function verifyRefreshToken(token: string): Promise<TokenPayload> {
  try {
    const { payload } = await jwtVerify(token, JWT_REFRESH_SECRET, {
      issuer: 'spsd-itweb',
      audience: 'spsd-students',
    });

    if (payload.type !== 'refresh') {
      throw new Error('Invalid token type');
    }

    return {
      userId: payload.sub as string,
      username: payload.username as string,
      email: '', // Refresh token doesn't contain email
    };
  } catch (_error) {
    throw new Error('Invalid or expired refresh token');
  }
}

/**
 * Extract token from Authorization header
 */
export function extractBearerToken(authHeader: string | null): string | null {
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return null;
  }

  return authHeader.substring(7);
}

/**
 * Get token from cookies
 */
export function getTokenFromCookie(cookieHeader: string | null, name: string): string | null {
  if (!cookieHeader) return null;

  const cookies = cookieHeader.split(';').map(c => c.trim());
  const tokenCookie = cookies.find(c => c.startsWith(`${name}=`));

  if (!tokenCookie) return null;

  return tokenCookie.substring(name.length + 1);
}
