import { cookies } from "next/headers";

export default async function Home() {
  const jar = await cookies();

  const me = await (
    await fetch(
      "https://app.safetyculture.com/api/v3/accounts/user/v1/user:WhoAmI",
      {
        headers: {
          cookie: `s12at=${jar.get("s12at")?.value};`,
        },
      },
    )
  ).json();

  return (
    <div className="flex h-full w-full bg-green-200   flex-row gap-4 p-4 flex-wrap">
      Hi, {me.firstname} {me.lastname}!
    </div>
  );
}
