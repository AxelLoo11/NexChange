// Get order detail, create order, cancel order

import { NextResponse, NextRequest } from "next/server";
import { getTokenFromRequest } from "@/lib";
// import { fakeGetOrdertData } from "@/lib/fakeApiRouteFunc";

const API_BASE_URL = `${process.env.NEXT_PUBLIC_ORDER_BACKEND_URL}/api/order-system/orders`;

// get order by orderid/sellerid/buyerid ... ?   ---->>>  [currently only use `get by orderid` for static test]
export async function GET(req: NextRequest) {
  const authHeader = await getTokenFromRequest(req);
  console.log("[TEST] Authheader: ", authHeader);
  const { searchParams } = new URL(req.url);
  const orderid = searchParams.get("orderid");

  try {
    const response = await fetch(`${API_BASE_URL}/${orderid}`, {
      method: "GET",
      headers: {
        Authorization: authHeader,
      },
    });
    const data = await response.json();

    // const data = fakeGetOrdertData(orderid || "");

    return NextResponse.json(data);
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: "Failed to fetch order data" },
      { status: 500 }
    );
  }
}

// create new order
export async function POST(req: NextRequest) {
  const authHeader = await getTokenFromRequest(req);
  const { userId, postId } = await req.json();

  try {
    const res = await fetch(`${API_BASE_URL}/new-order`, {
      method: "POST",
      headers: {
        Authorization: authHeader,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userId: userId, postId: postId }),
    });

    if (!res.ok) {
      throw new Error("Failed to create new order");
    }

    const data = await res.json();
    const { orderId } = data;

    return NextResponse.json(orderId, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: "Failed to create new order" },
      { status: 500 }
    );
  }
}

// cancel order by order id ...
export async function DELETE(req: NextRequest) {
  const authHeader = await getTokenFromRequest(req);
  const { searchParams } = new URL(req.url);

  const orderId = searchParams.get("orderId");
  if (!orderId) {
    return NextResponse.json(
      { error: "Missing necessary paramters" },
      { status: 500 }
    );
  }

  try {
    const response = await fetch(`${API_BASE_URL}/cancel?orderId=${orderId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: authHeader,
      },
    });

    if (response.ok) {
      return NextResponse.json({ message: "Order cancelled successfully" });
    } else {
      return NextResponse.json(
        { error: "Failed to cancel order" },
        { status: response.status }
      );
    }
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: "Failed to cancel order" },
      { status: 500 }
    );
  }
}
