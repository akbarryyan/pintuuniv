import { NextRequest, NextResponse } from 'next/server';

export function middleware(request: NextRequest) {
  // Check if the request is for admin routes
  if (request.nextUrl.pathname.startsWith('/sys/')) {
    // Skip authentication for login page
    if (request.nextUrl.pathname === '/sys/login') {
      return NextResponse.next();
    }

    // Check for admin token in cookies or headers
    const adminToken = request.cookies.get('adminToken')?.value || 
                      request.headers.get('authorization')?.replace('Bearer ', '');

    if (!adminToken) {
      // Redirect to admin login if no token found
      return NextResponse.redirect(new URL('/sys/login', request.url));
    }

    // In production, validate token here
    // For now, just check if token exists
    if (!adminToken.startsWith('admin_')) {
      return NextResponse.redirect(new URL('/sys/login', request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: '/sys/:path*',
};
