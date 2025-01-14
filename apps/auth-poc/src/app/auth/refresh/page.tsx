"use client";

import { useEffect } from "react";

// import { notFound } from "next/navigation";

export default function Page() {
  // NOTE: Ensure that the page is only accessible in development/preview mode
  // if (ENV === "PRODUCTION") {
  //   notFound();
  // }

  useEffect(() => {
    // NOTE: cross domain cookie issues if not on *.safetyculture.com domain.
    // May need to use a proxy server to handle the request, or use /auth/login flow.
    fetch("https://app.safetyculture.com/api/rest-proxy/api/v2/access_token");
  }, []);

  return null;
}
