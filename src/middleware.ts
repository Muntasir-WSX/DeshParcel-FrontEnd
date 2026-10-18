import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  return NextResponse.next();
}

export const config = {
  matcher: ["/login", "/register"],
};
