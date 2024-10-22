import { getTokenFromRequest } from "@/lib";
import { fakeorders } from "@/mockdata";
import { NextRequest, NextResponse } from "next/server";
// needed?
const API_BASE_URL = "http://localhost:8081/api/user-system/order-histories";

export async function GET(req: NextRequest) {
  // const authHeader = await getTokenFromRequest(req);
  const { searchParams } = new URL(req.url);

  const userId = searchParams.get("userid");

  if (!userId) {
    return new NextResponse("Missing necessary parameters", { status: 400 });
  }

  try {
    // const response = await fetch(`${API_BASE_URL}/${userId}`, {
    //   method: "GET",
    //   headers: {
    //     Authorization: authHeader,
    //   },
    // });

    // if (!response.ok) {
    //   return new NextResponse("Failed to fetch user order history", {
    //     status: response.status,
    //   });
    // }

    // const data = await response.json();
    const data = fakeorders.filter(
      (oh) => oh.refBuyer.userProfile.userId === userId
    );
    return new NextResponse(JSON.stringify(data), { status: 200 });
  } catch (error) {
    console.log(error);
    return new NextResponse("Error fetch user order history", { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  const authHeader = await getTokenFromRequest(req);
  const { searchParams } = new URL(req.url);

  const orderHistoryListId = searchParams.get("orderHistoryListId");
  const orderHistoryId = searchParams.get("orderHistoryId");

  if (!orderHistoryId || !orderHistoryListId) {
    return NextResponse.json(
      { error: "Missing neccessary query paramters" },
      { status: 400 }
    );
  }

  const res = await fetch(
    `${API_BASE_URL}/posts/delete?orderHistoryListId=${orderHistoryListId}&orderHistoryId=${orderHistoryId}`,
    {
      method: "DELETE",
      headers: {
        Authorization: authHeader,
      },
    }
  );

  if (!res.ok) {
    return NextResponse.json(
      { error: "Failed to delete order history" },
      { status: 500 }
    );
  }

  return NextResponse.json(null, { status: 204 });
}
