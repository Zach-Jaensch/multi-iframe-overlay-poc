import assert from "node:assert";
import { cookies } from "next/headers";
import { NextRequest } from "next/server";
import setAccessTokens from "#/utils/set-access-tokens";

export async function GET(req: NextRequest) {
  const redirectPath = req.nextUrl.searchParams.get("redirect");

  assert(typeof redirectPath === "string");

  try {
    // Ensure the redirect path is not an absolute URL
    new URL(redirectPath);
    throw new Error("Invalid redirect path");
  } catch {
    // noop
  }

  const jar = await cookies();
  const refreshToken = jar.get("s12rt")?.value;

  if (!refreshToken) {
    return Response.redirect(
      // Client-side refresh will only work if the host is *.safetyculture.com due to CORS
      req.headers.get("host")?.endsWith("safetyculture.com")
        ? new URL("/auth/refresh?redirect=" + redirectPath, req.url)
        : new URL("/auth/login?redirect=" + redirectPath, req.url),
    );
  }

  const res = await fetch(
    "https://app.safetyculture.com/api/v3/authorization/v1/auth/token",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        grantType: "refresh_token",
        refreshToken,
      }),
    },
  );

  if (res.status === 401) {
    return Response.redirect(
      new URL("/auth/login?redirect=" + redirectPath, req.url),
    );
  }

  const accessTokens = await res.json();

  setAccessTokens(
    accessTokens.access_token,
    accessTokens.refresh_token,
    accessTokens.expires_in,
  );

  return Response.redirect(new URL(redirectPath, req.url));
}
