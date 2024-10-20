import { NextResponse, NextRequest } from "next/server";
import { getTokenFromRequest } from "@/lib";

const API_BASE_URL = "http://localhost:8083/api/order-system/orders";

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
    const response = await fetch(apiEndpoint, {
      method: "GET",
      headers: {
        Authorization: authHeader,
      },
    });
    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch order data" },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  const authHeader = await getTokenFromRequest(req);
  const body = await req.json();

  try {
    const response = await fetch(`${API_BASE_URL}/new-order`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: authHeader,
      },
      body: JSON.stringify(body),
    });

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to create new order" },
      { status: 500 }
    );
  }
}

// may be not needed ?????? or missing variables ?
export async function DELETE(req: NextRequest) {
  const authHeader = await getTokenFromRequest(req);
  const body = await req.json();

  try {
    const response = await fetch(`${API_BASE_URL}/delete`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: authHeader,
      },
      body: JSON.stringify(body),
    });

    if (response.ok) {
      return NextResponse.json({ message: "Order deleted successfully" });
    } else {
      return NextResponse.json(
        { error: "Failed to delete order" },
        { status: response.status }
      );
    }
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to delete order" },
      { status: 500 }
    );
  }
}
