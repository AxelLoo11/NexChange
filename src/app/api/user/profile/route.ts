import { getTokenFromRequest } from "@/lib";
import { error } from "console";
// import { fakeGetUserProfileData } from "@/lib/fakeApiRouteFunc";
import { NextRequest, NextResponse } from "next/server";

const API_BASE_URL = `${process.env.NEXT_PUBLIC_BACKEND_URL}:8081/api/user-system/profile`;

// get profile by id
export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const userId = searchParams.get("userid");

  if (userId === null) {
    return NextResponse.json({ error: "Missing parameter" }, { status: 500 });
  }

  try {
    const authHeader = await getTokenFromRequest(req);
    console.log("[TEST] Authheader: ", authHeader);
    const res = await fetch(`${API_BASE_URL}/${userId}`, {
      method: "GET",
      headers: {
        Authorization: authHeader,
      },
    });

    if (!res.ok) {
      return NextResponse.error();
    }

    const data = await res.json();

    // const data = fakeGetUserProfileData(userId);
    console.log("The fetched profile is: ", data);

    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    return NextResponse.json(error, { status: 400 });
  }
}

// update profile by id
export async function POST(req: NextRequest) {
  const authHeader = await getTokenFromRequest(req);
  const body = await req.json();

  const res = await fetch(`${API_BASE_URL}/update`, {
    method: "POST",
    headers: {
      Authorization: authHeader,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    return NextResponse.json(
      { error: "Update profile failed" },
      { status: res.status }
    );
  }

  // const data = await res.json();
  return NextResponse.json(null, { status: res.status });
}
