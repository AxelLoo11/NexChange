import { NextResponse, NextRequest } from "next/server";
import { getTokenFromRequest } from "@/lib";
import { fakeorders } from "@/mockdata";

const API_BASE_URL = "http://localhost:8083/api/order-system/orders";

// get order by orderid/sellerid/userid ... ?   ----  [currently only used get by orderid]
export async function GET(req: NextRequest) {
  const authHeader = await getTokenFromRequest(req);

  const { searchParams } = new URL(req.url);
  const userid = searchParams.get("userid");
  const sellerid = searchParams.get("sellerid");
  const orderid = searchParams.get("orderid");

  let apiEndpoint = "";

  if (orderid) {
    apiEndpoint = `${API_BASE_URL}/${orderid}`; // not sure about this url ...
  } else if (sellerid) {
    apiEndpoint = `${API_BASE_URL}/seller?sellerid=${sellerid}`;
  } else if (userid) {
    apiEndpoint = `${API_BASE_URL}/user?userid=${userid}`;
  } else {
    return NextResponse.json(
      { error: "Missing query parameters" },
      { status: 400 }
    );
  }

  try {
    // const response = await fetch(apiEndpoint, {
    //   method: "GET",
    //   headers: {
    //     Authorization: authHeader,
    //   },
    // });
    // const data = await response.json();
    const data = fakeorders.find((o) => o.orderId === orderid);
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch order data" },
      { status: 500 }
    );
  }
}

// create new order ???? GET ????
export async function POST(req: NextRequest) {
  const authHeader = await getTokenFromRequest(req);
  const { userId, postId } = await req.json();

  try {
    const res = await fetch(
      `${API_BASE_URL}/new-order?userId=${userId}&postId=${postId}`,
      {
        method: "GET",
        headers: {
          Authorization: authHeader,
        },
      }
    );

    if (!res.ok) {
      throw new Error("Failed to create new order");
    }

    return NextResponse.json(
      { message: "Create New order Success ..." },
      { status: 200 }
    );
  } catch (error) {
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
    return NextResponse.json(
      { error: "Failed to cancel order" },
      { status: 500 }
    );
  }
}
