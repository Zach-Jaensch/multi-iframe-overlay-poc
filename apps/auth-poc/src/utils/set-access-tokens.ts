import { cookies } from "next/headers";
import "server-only";

export default async function setAccessTokens(
  accessToken: string,
  refreshToken: string,
  expiresIn: number,
) {
  const jar = await cookies();

  jar.set("s12at", accessToken, {
    httpOnly: true,
    // secure: true, // Must be true in production
    maxAge: expiresIn,
    sameSite: "strict",
    path: "/",
  });
  jar.set("s12rt", refreshToken, {
    httpOnly: true,
    // secure: true, // Must be true in production
    sameSite: "strict",
    path: "/api/v3/authorization/v1/auth/refresh",
  });
}
