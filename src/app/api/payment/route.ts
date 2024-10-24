// just to confirm order ...

import { NextResponse, NextRequest } from "next/server";
import { getTokenFromRequest } from "@/lib";
import orderTimerStore from "@/lib/orderTimer";

const API_BASE_URL = `${process.env.NEXT_PUBLIC_BACKEND_URL}:8083/api/order-system/orders`;

export async function GET(req: NextRequest) {
  const authHeader = await getTokenFromRequest(req);
  const { searchParams } = new URL(req.url);
  const orderId = searchParams.get("orderId");

  if (!orderId) {
    return NextResponse.json(
      { error: "Missing necessary paramters" },
      { status: 500 }
    );
  }

  // Call backend service to confirm the order
  const confirmResponse = await fetch(
    `${API_BASE_URL}/pay?orderId=${orderId}`,
    {
      method: "GET",
      headers: {
        Authorization: authHeader,
      },
    }
  );

  if (confirmResponse.ok) {
    // Clear the expiration timer
    orderTimerStore.clearTimer(orderId);

    return NextResponse.json({ message: "Order confirmed" }, { status: 200 });
  }

  return NextResponse.json(
    { message: "Failed to confirm order" },
    { status: 500 }
  );
}
