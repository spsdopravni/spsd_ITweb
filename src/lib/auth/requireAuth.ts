import { NextRequest, NextResponse } from 'next/server';
import { verifyAccessToken } from './jwt';

export type AuthUser = {
  userId: string;
  username: string;
  email: string;
  role?: string;
};

export type AuthResult =
  | { ok: true; user: AuthUser }
  | { ok: false; response: NextResponse };

export async function requireAuth(request: NextRequest): Promise<AuthResult> {
  const accessToken = request.cookies.get('accessToken')?.value;
  if (!accessToken) {
    return {
      ok: false,
      response: NextResponse.json({ error: 'Nejste přihlášeni' }, { status: 401 }),
    };
  }

  try {
    const payload = await verifyAccessToken(accessToken);
    return { ok: true, user: payload };
  } catch {
    return {
      ok: false,
      response: NextResponse.json({ error: 'Neplatný nebo expirovaný token' }, { status: 401 }),
    };
  }
}
