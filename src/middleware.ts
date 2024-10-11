import { NextRequest, NextResponse } from 'next/server';

export function middleware(req: NextRequest) {
  // Retrieve the JWT from the cookies
  const token = req.cookies.get('jwt')?.value;

  // Check if token exists
  if (!token) {
    // Redirect to login if no token
    return NextResponse.redirect(new URL('/login', req.url));
  }

  // You can optionally verify the JWT here with a library like `jsonwebtoken` if needed
  // const isValid = verifyJwt(token); // Pseudo code for token validation
  // if (!isValid) {
  //   return NextResponse.redirect(new URL('/login', req.url));
  // }

  // Allow the user to access the page if the token exists
  return NextResponse.next();
}

// Apply this middleware to protected routes
export const config = {
  matcher: ['/explore/:path*', '/chat/:path*', '/order/:path*', '/post/:path*', '/user/:path*'],
};
