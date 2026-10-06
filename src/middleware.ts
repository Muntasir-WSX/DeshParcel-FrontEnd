import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Next.js explicitly requires 'middleware' or 'default' function export
export function middleware(request: NextRequest) {
  const token = request.cookies.get("accessToken")?.value || request.headers.get("authorization");
  const { pathname } = request.nextUrl;

  // প্রটেক্টেড রুটগুলো (যেমন: ড্যাশবোর্ড, অ্যাডমিন ইত্যাদি)
  const isProtectedPath = pathname.startsWith("/dashboard") || pathname.startsWith("/admin") || pathname.startsWith("/provider");
  
  // অথ পেজগুলো (যেমন: লগইন, রেজিস্টার) যেখানে লগইন করা ইউজার ঢুকতে পারবে না
  const isAuthPath = pathname === "/login" || pathname === "/register";

  if (isProtectedPath && !token) {
    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set("callbackUrl", pathname);
    return NextResponse.redirect(loginUrl);
  }

  if (isAuthPath && token) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  return NextResponse.next();
}


export const config = {
  matcher: ["/dashboard/:path*", "/admin/:path*", "/provider/:path*", "/login", "/register"],
};