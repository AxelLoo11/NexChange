import { NextRequest, NextResponse } from "next/server";
import { getTokenFromRequest } from "@/lib";

const API_BASE_URL = `${process.env.NEXT_PUBLIC_BACKEND_URL}:8083/api/order-system/orders`;

export async function GET(req: NextRequest) {
  const authHeader = await getTokenFromRequest(req);
  const body = await req.json();
  const { orderId } = body;

  // Call backend service to expire the order
  const expireResponse = await fetch(
    `${API_BASE_URL}/expire?orderId=${orderId}`,
    {
      method: "GET",
      headers: {
        Authorization: authHeader,
      },
    }
  );

  if (expireResponse.ok) {
    return NextResponse.json({ message: "Order expired" }, { status: 200 });
  }

  return NextResponse.json(
    { message: "Failed to expire order" },
    { status: 500 }
  );
}
