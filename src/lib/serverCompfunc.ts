"use server";

import {
  OrderDetail,
  Post,
  UserContactList,
  UserOrderHistoryList,
  UserPostHistoryList,
  UserWishPostList,
} from "@/models";

export async function fetchAllPosts(authHeader: string): Promise<Post[]> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/post`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `${authHeader}`, // Include token in headers
    },
    cache: "no-store", // Ensures fresh data is fetched
  });

  if (!res.ok) {
    throw new Error("Failed to fetch Posts");
  }

  return res.json();
}

export async function fetchPostById(
  postId: string,
  authHeader: string
): Promise<Post> {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/post?postid=${postId}`,
    {
      method: "GET",
      headers: {
        Authorization: `${authHeader}`, // Include token in headers
      },
      cache: "no-store", // Ensures fresh data is fetched
    }
  );

  if (!res.ok) {
    throw new Error("Failed to fetch Post Detail by postId");
  }

  const data = await res.json();
  return data;
}

export async function checkPostInWish(
  postId: string,
  userId: string,
  authHeader: string
): Promise<boolean> {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/user/wishlist?userid=${userId}&postid=${postId}`,
    {
      method: "GET",
      headers: {
        Authorization: `${authHeader}`, // Include token in headers
      },
      cache: "no-store", // Ensures fresh data is fetched
    }
  );

  if (!res.ok) {
    throw new Error("Failed to check Post in wishlist or not");
  }

  const data = await res.json();
  return data;
}

export async function fetchUserWishList(
  userId: string,
  authHeader: string
): Promise<UserWishPostList> {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/user/wishlist?userid=${userId}`,
    {
      method: "GET",
      headers: {
        Authorization: `${authHeader}`, // Include token in headers
      },
      cache: "no-store", // Ensures fresh data is fetched
    }
  );

  if (!res.ok) {
    throw new Error("Failed to fetch Wish Posts");
  }

  const data = await res.json();
  // console.log("Fetched WishPosts: ", data);

  return data;
}

export async function fetchUserPostHistory(
  userId: string,
  authHeader: string
): Promise<UserPostHistoryList> {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/user/posthistory?userid=${userId}`,
    {
      method: "GET",
      headers: {
        Authorization: `${authHeader}`, // Include token in headers
      },
      cache: "no-store", // Ensures fresh data is fetched
    }
  );

  if (!res.ok) {
    throw new Error("Failed to fetch Post Historys");
  }

  const data = await res.json();
  // console.log("Fetched PostHistories: ", data);

  return data;
}

export async function fetchUserContacts(
  userid: string,
  authHeader: string
): Promise<UserContactList> {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/user/contact?userid=${userid}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `${authHeader}`, // Include token in headers
      },
      cache: "no-store", // Ensures fresh data is fetched
    }
  );

  if (!res.ok) {
    throw new Error("Failed to fetch user contacts");
  }

  const data = await res.json();

  return data;
}

export async function fetchUserOrders(
  userid: string,
  authHeader: string
): Promise<UserOrderHistoryList> {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/user/orderhistory?userid=${userid}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `${authHeader}`, // Include token in headers
      },
      cache: "no-store", // Ensures fresh data is fetched
    }
  );

  if (!res.ok) {
    throw new Error("Failed to fetch order histories");
  }

  const data = await res.json();

  return data;
}

export async function fetchOrderById(
  orderId: string,
  authHeader: string
): Promise<OrderDetail> {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/order?orderid=${orderId}`,
    {
      method: "GET",
      cache: "no-store",
      headers: {
        Authorization: `${authHeader}`,
      },
    }
  );

  if (!res.ok) {
    throw new Error("Failed to fetch order details");
  }

  const data = await res.json();

  return data;
}
