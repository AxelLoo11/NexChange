// app/api/auth/logout/route.ts
import { NextResponse } from 'next/server';

export async function GET() {
  const response = NextResponse.json({ message: 'Logged out' });

  // Clear cookies by setting them to expire
  response.cookies.set('userid', '', { maxAge: -1, path: '/' });
  response.cookies.set('token', '', { maxAge: -1, path: '/' });
  response.cookies.set('tokenType', '', { maxAge: -1, path: '/' });

  return response;
}
