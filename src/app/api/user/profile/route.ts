import { getTokenFromRequest } from "@/lib";
import { fakeProfiles } from "@/mockdata";
import { NextRequest, NextResponse } from "next/server";

const API_BASE_URL = "http://localhost:8081/api/user-system/profile";


// get profile by id
export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const userId = searchParams.get("userid");
  const authHeader = await getTokenFromRequest(req);
  console.log(authHeader);

  // const res = await fetch(`${API_BASE_URL}/${userId}`, {
  //   method: "GET",
  //   headers: {
  //     Authorization: authHeader,
  //   },
  // });

  // if (!res.ok) {
  //   return NextResponse.error();
  // }

  // const data = await res.json();

  const data = fakeProfiles.find((p) => p.userId === userId);

  return NextResponse.json(data);
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

  const data = await res.json();
  return NextResponse.json(data, { status: res.status });
}
