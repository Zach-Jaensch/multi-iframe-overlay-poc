import { NextRequest, NextResponse } from "next/server";

export default function middleware(req: NextRequest) {
  const currentAccessToken = req.cookies.get("s12at")?.value;

  const isAuthRoute = req.nextUrl.pathname.startsWith("/auth");
  const isRefreshRoute = req.nextUrl.pathname.startsWith(
    "/api/v3/authorization/v1/auth/refresh",
  );

  if (currentAccessToken == null && !(isAuthRoute || isRefreshRoute)) {
    return NextResponse.redirect(
      "http://localhost:3000/api/v3/authorization/v1/auth/refresh?redirect=" +
        encodeURIComponent(req.nextUrl.pathname),
    );
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    {
      source:
        "/((?!api|_next/static|_next/image|_next/data|shared|sitemap|assets|favicon).*)",
    },
  ],
};
