import { NextRequest, NextResponse } from "next/server";
import { verifyTokenEdge } from "@/lib/auth-edge";

// Define protected routes
const protectedRoutes = [
  "/dashboard",
  "/tryouts",
  "/leaderboard",
  "/profile",
  "/lessons",
];

// Define auth routes (redirect to dashboard if already logged in)
const authRoutes = ["/login", "/register"];

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const token =
    request.cookies.get("auth-token")?.value ||
    request.headers.get("authorization")?.replace("Bearer ", "");

  // Debug logging
  console.log("Middleware - Path:", pathname);
  console.log("Middleware - Token:", token ? "Present" : "Not found");
  console.log("Middleware - Cookies:", request.cookies.getAll());

  // Check if current route is protected
  const isProtectedRoute = protectedRoutes.some((route) =>
    pathname.startsWith(route)
  );

  // Check if current route is auth route
  const isAuthRoute = authRoutes.some((route) => pathname.startsWith(route));

  // For protected routes
  if (isProtectedRoute) {
    if (!token) {
      // Redirect to login if no token (tanpa query redirect) + set cookie flag for toast
      const resp = NextResponse.redirect(new URL("/login", request.url));
      resp.cookies.set("login_required", "1", {
        path: "/",
        maxAge: 30,
        httpOnly: false,
        sameSite: "lax",
        secure: process.env.NODE_ENV === "production",
      });
      return resp;
    }

    // Verify token
    const payload = await verifyTokenEdge(token);
    if (!payload) {
      // Invalid token, redirect to login (tanpa query redirect) + set cookie flag for toast
      const resp = NextResponse.redirect(new URL("/login", request.url));
      resp.cookies.set("login_required", "1", {
        path: "/",
        maxAge: 30,
        httpOnly: false,
        sameSite: "lax",
        secure: process.env.NODE_ENV === "production",
      });
      return resp;
    }

    // Add user info to headers for the request
    const response = NextResponse.next();
    response.headers.set("x-user-id", payload.userId.toString());
    response.headers.set("x-user-email", payload.email);
    response.headers.set("x-subscription-type", payload.subscriptionType);
    return response;
  }

  // For auth routes (login/register)
  if (isAuthRoute && token) {
    // If user is already logged in, redirect to dashboard
    const payload = await verifyTokenEdge(token);
    if (payload) {
      return NextResponse.redirect(new URL("/dashboard", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     */
    "/((?!api|_next/static|_next/image|favicon.ico|public).*)",
  ],
};
