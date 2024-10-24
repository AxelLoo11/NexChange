// Get order detail, create order, cancel order

import { NextResponse, NextRequest } from "next/server";
import { getTokenFromRequest } from "@/lib";
import { fakeorders } from "@/mockdata";
import orderTimerStore from "@/lib/orderTimer";

const API_BASE_URL = `${process.env.NEXT_PUBLIC_BACKEND_URL}:8083/api/order-system/orders`;

function fakeGetData(orderId: string): any {
  const rawdata = fakeorders.find((o) => o.orderId === orderId);
  if (rawdata) {
    const userId = rawdata.refBuyer.userProfile.userId;
    return {
      orderId: orderId,
      refPostId: rawdata.refPost.refPostId,
      refPostTitle: rawdata.refPost.refPostTitle,
      refPostShortcutURL: rawdata.refPost.refPostShortcutURL,
      refPostPrice: rawdata.refPost.refPostPrice,
      orderStatus: rawdata.orderStatus,
      sellerDetail: {
        sellerId: `testsellerId-${orderId}`,
        refUserId: rawdata.refSeller.userProfile.userId,
        sellerName: rawdata.refSeller.userProfile.userNickName,
        sellerAvatarURL: rawdata.refSeller.userProfile.userAvatarURL,
      },
      buyerDetail: {
        buyerId: `testbuyerId-${orderId}`,
        refUserId: userId,
        buyerName: rawdata.refBuyer.userProfile.userNickName,
        buyerAddress: rawdata.refBuyer.userContact?.contactAddress,
        buyerPostalCode: rawdata.refBuyer.userContact?.postalCode,
        buyerContactNumber: rawdata.refBuyer.userContact?.contactNumber,
      },
      userId: userId,
      createdAt: rawdata.createdAt,
    };
  }
  return null;
}

// get order by orderid/sellerid/buyerid ... ?   ---->>>  [currently only use `get by orderid` for static test]
export async function GET(req: NextRequest) {
  const authHeader = await getTokenFromRequest(req);
  console.log("[TEST] Authheader: ", authHeader);
  const { searchParams } = new URL(req.url);
  // const userid = searchParams.get("userid");
  // const sellerid = searchParams.get("sellerid");
  const orderid = searchParams.get("orderid");

  // let apiEndpoint = "";

  // if (orderid) {
  //   apiEndpoint = `${API_BASE_URL}/${orderid}`; // not sure about this url ...
  // } else if (sellerid) {
  //   apiEndpoint = `${API_BASE_URL}/seller?sellerid=${sellerid}`;
  // } else if (userid) {
  //   apiEndpoint = `${API_BASE_URL}/user?userid=${userid}`;
  // } else {
  //   return NextResponse.json(
  //     { error: "Missing query parameters" },
  //     { status: 400 }
  //   );
  // }

  try {
    // const response = await fetch(apiEndpoint, {
    //   method: "GET",
    //   headers: {
    //     Authorization: authHeader,
    //   },
    // });
    // const data = await response.json();

    const data = fakeGetData(orderid || "");

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
      },
      body: JSON.stringify({ userId: userId, postId: postId }),
    });

    if (!res.ok) {
      throw new Error("Failed to create new order");
    }

    const data = await res.json();
    const { orderId } = data;

    // Set a timer to expire the order after 15 minutes
    const timer = setTimeout(async () => {
      await fetch(`${API_BASE_URL}/expire?orderId=${orderId}`, {
        method: "POST",
      });
    }, 15 * 60 * 1000); // 15 minutes

    // Store the timer in the shared store
    orderTimerStore.setTimer(orderId, timer);

    return NextResponse.json(
      { message: "Create New order Success ..." },
      { status: 200 }
    );
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
      orderTimerStore.clearTimer(orderId);
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
