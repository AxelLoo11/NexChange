// app/api/auth/logout/route.ts
import { NextResponse, NextRequest } from "next/server";
import { getTokenFromRequest } from "@/lib";

const API_BASE_URL = `${process.env.NEXT_PUBLIC_BACKEND_URL}:8081/api/user-system/auth/logout`;

export async function GET(req: NextRequest) {
  const authHeader = await getTokenFromRequest(req);
  console.log("[TEST]: authheader: ", authHeader);
  const res = await fetch(API_BASE_URL, {
    method: "POST",
    headers: {
      Authorization: authHeader,
    },
  });

  if (!res.ok) {
    return NextResponse.json({ error: "Logout Failed" }, { status: 500 });
  }

  const response = NextResponse.json(
    { message: "Logout Success" },
    { status: 200 }
  );

  // Clear cookies by setting them to expire
  response.cookies.set("userid", "", { maxAge: -1, path: "/" });
  response.cookies.set("token", "", { maxAge: -1, path: "/" });
  response.cookies.set("tokenType", "", { maxAge: -1, path: "/" });
  response.cookies.set("userData", "", { maxAge: -1, path: "/" });

  return response;
}
