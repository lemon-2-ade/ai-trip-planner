import { NextRequest, NextResponse } from "next/server";

export default function middleware(request: NextRequest) {
  // Get the path of the request
  const path = request.nextUrl.pathname;

  // Paths that require authentication
  const isPrivatePath = path.startsWith("/create-new-trip");

  // Get the token from the request cookies
  const token = request.cookies.get("auth-token")?.value;

  // If the path requires authentication and there's no token, redirect to home
  if (isPrivatePath && !token) {
    // Create the URL to redirect to
    const url = new URL("/", request.url);

    // You can pass an error message through a query parameter
    url.searchParams.set("authError", "Please sign in to access this page");

    // Redirect to the home page
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}
