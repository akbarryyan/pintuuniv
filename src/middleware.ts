import { NextRequest, NextResponse } from "next/server";
import { verifyTokenEdge } from "@/lib/auth-edge";

// Define protected routes
const protectedRoutes = [
  "/dashboard",
  "/tryouts",
  "/leaderboard",
  "/profile",
  "/lessons",
  "/discuss",
];

// Define auth routes (redirect to dashboard if already logged in)
const authRoutes = ["/login", "/register"];

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const token =
    request.cookies.get("auth-token")?.value ||
    request.headers.get("authorization")?.replace("Bearer ", "");

  // Check if current route is protected
  const isProtectedRoute = protectedRoutes.some((route) =>
    pathname.startsWith(route)
  );

  // Check if current route is auth route
  const isAuthRoute = authRoutes.some((route) => pathname.startsWith(route));

  // Debug logging
  console.log("=== MIDDLEWARE DEBUG ===");
  console.log("Middleware - Path:", pathname);
  console.log("Middleware - Token:", token ? "Present" : "Not found");
  console.log("Middleware - Token value:", token);
  console.log("Middleware - Cookies:", request.cookies.getAll());
  console.log("Middleware - isProtectedRoute:", isProtectedRoute);
  console.log("Middleware - isAuthRoute:", isAuthRoute);

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
    console.log("Middleware - Starting JWT verification...");
    const payload = await verifyTokenEdge(token);
    console.log("Middleware - JWT verification result:", payload);
    
    if (!payload) {
      console.error("Middleware - JWT verification failed, redirecting to login");
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
    
    console.log("Middleware - Token verified successfully, payload:", payload);

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
