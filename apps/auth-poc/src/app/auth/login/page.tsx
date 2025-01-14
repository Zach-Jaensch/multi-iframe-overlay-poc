import assert from "node:assert";
import { redirect } from "next/navigation";
import setAccessTokens from "#/utils/set-access-tokens";

// import { notFound } from "next/navigation";

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  // NOTE: Ensure that the page is only accessible in development/preview mode
  // if (ENV === "PRODUCTION") {
  //   notFound();
  // }

  const { redirect: redirectPath } = await searchParams;
  assert(typeof redirectPath === "string");

  try {
    // Ensure the redirect path is not an absolute URL

    new URL(redirectPath);
    throw new Error("Invalid redirect path");
  } catch {
    // noop
  }

  async function handleSubmit(data: FormData) {
    "use server";

    const res = await fetch(
      "https://app.safetyculture.com/api/v3/authorization/v1/auth/token",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          grantType: "password",
          username: data.get("username"),
          password: data.get("password"),
        }),
      },
    );

    const accessTokens = await res.json();

    await setAccessTokens(
      accessTokens.access_token,
      accessTokens.refresh_token,
      accessTokens.expires_in,
    );

    redirect(redirectPath as string);
  }

  return (
    <form
      action={handleSubmit}
      className="flex flex-col gap-4 w-[300px] m-auto"
    >
      <label className="flex flex-col gap-2">
        username
        <input className="border border-gray-300 rounded-md" name="username" />
      </label>
      <label className="flex flex-col gap-2">
        password
        <input
          className="border border-gray-300 rounded-md"
          name="password"
          type="password"
        />
      </label>
      <button className="bg-blue-500 text-white rounded-md p-2" type="submit">
        Login
      </button>
    </form>
  );
}
