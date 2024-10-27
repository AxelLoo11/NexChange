"use server";

import { headers } from "next/headers";
import { NextRequest } from "next/server";

export async function getTokenFromRequest(req: NextRequest): Promise<string> {
  const headersList = headers();
  const auth = headersList.get("Authorization");
  console.log("-\tGet the Header Authorization: ", auth);
  if (auth) {
    return auth;
  }

  const cookieHeader = req.headers.get("cookie") || "";
  const cookies = Object.fromEntries(
    cookieHeader.split("; ").map((cookie) => cookie.split("="))
  );

  const token = cookies.token;
  const tokenType = cookies.tokenType;
  if (!token || !tokenType) {
    throw new Error("Authorization token or token type missing");
  }
  return decodeURIComponent(`${tokenType}${token}`);
}
