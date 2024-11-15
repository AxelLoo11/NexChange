import { getTokenFromRequest } from "@/lib";
// import { fakeGetUserPostHistoryData } from "@/lib/fakeApiRouteFunc";
import { NextRequest, NextResponse } from "next/server";

const API_BASE_URL = `${process.env.NEXT_PUBLIC_USER_BACKEND_URL}/api/user-system/post-histories`;

export async function GET(req: NextRequest) {
  const authHeader = await getTokenFromRequest(req);
  console.log("[TEST]: authheader: ", authHeader);
  const { searchParams } = new URL(req.url);

  const userId = searchParams.get("userid");

  if (!userId) {
    return new NextResponse("Missing necessary parameters", { status: 400 });
  }

  try {
    const response = await fetch(`${API_BASE_URL}/${userId}`, {
      method: "GET",
      headers: {
        Authorization: authHeader,
      },
    });

    if (!response.ok) {
      return new NextResponse("Failed to fetch user post history", {
        status: response.status,
      });
    }

    const data = await response.json();

    // const data = fakeGetUserPostHistoryData(userId);

    return new NextResponse(JSON.stringify(data), { status: 200 });
  } catch (error) {
    console.log(error);
    return new NextResponse("Error fetch user post history", { status: 500 });
  }
}
