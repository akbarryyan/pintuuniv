import { NextRequest, NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';

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

    try {
      // Verify JWT token
      const decoded = jwt.verify(adminToken, process.env.JWT_SECRET || 'fallback-secret-key') as any;
      
      // Check if user is admin
      if (decoded.role !== 'admin' || decoded.type !== 'admin') {
        return NextResponse.redirect(new URL('/sys/login', request.url));
      }

      // Add user info to headers for API routes
      const requestHeaders = new Headers(request.headers);
      requestHeaders.set('x-user-id', decoded.id.toString());
      requestHeaders.set('x-user-email', decoded.email);
      requestHeaders.set('x-user-role', decoded.role);

      return NextResponse.next({
        request: {
          headers: requestHeaders,
        },
      });

    } catch (error) {
      // Token is invalid
      return NextResponse.redirect(new URL('/sys/login', request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: '/sys/:path*',
};
