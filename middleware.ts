import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const hostname = request.headers.get("host") || "";

  if (hostname.startsWith("kpr.") && request.nextUrl.pathname !== "/KPR") {
    const url = request.nextUrl.clone();
    url.pathname = "/KPR";
    return NextResponse.rewrite(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon\\.ico|api|.*\\..*).*)",],
};
