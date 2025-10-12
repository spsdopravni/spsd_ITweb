/**
 * Microsoft OAuth Configuration
 * Handles Microsoft Azure AD authentication for SPŠD students
 */

import { parseEmail, isValidSPSDEmail } from '@/lib/utils/email-parser';

// Microsoft OAuth endpoints
const MICROSOFT_AUTHORITY = 'https://login.microsoftonline.com';
const TENANT_ID = process.env.MICROSOFT_TENANT_ID || 'common'; // Use 'common' for multi-tenant

export const MICROSOFT_CONFIG = {
  clientId: process.env.MICROSOFT_CLIENT_ID!,
  clientSecret: process.env.MICROSOFT_CLIENT_SECRET!,
  tenantId: TENANT_ID,
  redirectUri: process.env.MICROSOFT_REDIRECT_URI || `${process.env.NEXT_PUBLIC_APP_URL}/api/auth/callback`,

  // OAuth URLs
  authorizationUrl: `${MICROSOFT_AUTHORITY}/${TENANT_ID}/oauth2/v2.0/authorize`,
  tokenUrl: `${MICROSOFT_AUTHORITY}/${TENANT_ID}/oauth2/v2.0/token`,
  userInfoUrl: 'https://graph.microsoft.com/v1.0/me',

  // Required scopes
  scopes: [
    'openid',
    'profile',
    'email',
    'User.Read',
  ],
} as const;

export interface MicrosoftUser {
  id: string; // Microsoft user ID
  email: string;
  displayName: string;
  givenName: string | null;
  surname: string | null;
  username: string; // Extracted from email
}

/**
 * Generate Microsoft OAuth authorization URL
 */
export function generateAuthorizationUrl(state: string): string {
  const params = new URLSearchParams({
    client_id: MICROSOFT_CONFIG.clientId,
    response_type: 'code',
    redirect_uri: MICROSOFT_CONFIG.redirectUri,
    response_mode: 'query',
    scope: MICROSOFT_CONFIG.scopes.join(' '),
    state: state, // CSRF protection
    prompt: 'select_account', // Always show account selector
  });

  return `${MICROSOFT_CONFIG.authorizationUrl}?${params.toString()}`;
}

/**
 * Exchange authorization code for access token
 */
export async function exchangeCodeForToken(code: string): Promise<{
  accessToken: string;
  refreshToken?: string;
  expiresIn: number;
  tokenType: string;
}> {
  const params = new URLSearchParams({
    client_id: MICROSOFT_CONFIG.clientId,
    client_secret: MICROSOFT_CONFIG.clientSecret,
    code: code,
    redirect_uri: MICROSOFT_CONFIG.redirectUri,
    grant_type: 'authorization_code',
  });

  const response = await fetch(MICROSOFT_CONFIG.tokenUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: params.toString(),
  });

  if (!response.ok) {
    const error = await response.json();
    console.error('Token exchange error:', error);
    throw new Error('Failed to exchange code for token');
  }

  const data = await response.json();

  return {
    accessToken: data.access_token,
    refreshToken: data.refresh_token,
    expiresIn: data.expires_in,
    tokenType: data.token_type,
  };
}

/**
 * Fetch user information from Microsoft Graph API
 */
export async function fetchUserInfo(accessToken: string): Promise<MicrosoftUser> {
  const response = await fetch(MICROSOFT_CONFIG.userInfoUrl, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  if (!response.ok) {
    const error = await response.json();
    console.error('User info fetch error:', error);
    throw new Error('Failed to fetch user information');
  }

  const data = await response.json();

  // Validate that email is from SPŠD domain
  if (!isValidSPSDEmail(data.mail || data.userPrincipalName)) {
    throw new Error(
      'Neplatná školní emailová adresa. Musíte použít email s doménou @sps-mot.dopravni.cz nebo @mot.sps-dopravni.cz'
    );
  }

  const email = (data.mail || data.userPrincipalName).toLowerCase();
  const parsed = parseEmail(email);

  return {
    id: data.id,
    email: email,
    displayName: data.displayName || parsed.username,
    givenName: data.givenName || null,
    surname: data.surname || null,
    username: parsed.username,
  };
}

/**
 * Complete OAuth flow
 * Returns user information if successful
 */
export async function completeMicrosoftOAuth(code: string): Promise<MicrosoftUser> {
  // Step 1: Exchange code for token
  const { accessToken } = await exchangeCodeForToken(code);

  // Step 2: Fetch user info
  const userInfo = await fetchUserInfo(accessToken);

  return userInfo;
}

/**
 * Generate random state for CSRF protection
 */
export function generateState(): string {
  const array = new Uint8Array(32);
  crypto.getRandomValues(array);
  return Array.from(array, byte => byte.toString(16).padStart(2, '0')).join('');
}

/**
 * Validate OAuth state (CSRF protection)
 */
export function validateState(receivedState: string, storedState: string): boolean {
  return receivedState === storedState && receivedState.length > 0;
}
