import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
  // Get the pathname of the request
  const path = request.nextUrl.pathname;

  // Define public paths that don't require authentication
  const isPublicPath =
    path === "/login" || path === "/signup" || path === "/forgot-password";

  // Get the token from the cookies
  const token = request.cookies.get("access_token")?.value || "";

  // Redirect logic
  if (isPublicPath && token) {
    // If user is on a public path and has a token, redirect to dashboard
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  if (!isPublicPath && !token) {
    // If user is on a protected path and has no token, redirect to login
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // For admin routes, check if user has admin role
  if (path.startsWith("/admin")) {
    // Get user data from cookies
    const userData = request.cookies.get("user")?.value;

    if (userData) {
      try {
        const user = JSON.parse(userData);
        // Check if user has admin role
        if (user.role !== "ADMIN") {
          // If not admin, redirect to dashboard
          return NextResponse.redirect(new URL("/dashboard", request.url));
        }
      } catch (error) {
        // If there's an error parsing user data, redirect to login
        return NextResponse.redirect(new URL("/login", request.url));
      }
    } else {
      // If no user data, redirect to login
      return NextResponse.redirect(new URL("/login", request.url));
    }
  }

  return NextResponse.next();
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: [
    "/dashboard/:path*",
    "/admin/:path*",
    "/login",
    "/signup",
    "/forgot-password",
    "/settings/:path*",
  ],
};
