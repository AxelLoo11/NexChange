import { fakeposts } from "@/mockdata";
import { NextRequest, NextResponse } from "next/server";
import { headers } from "next/headers";

const API_BASE_URL = "http://localhost:8082/api/post-system";

async function getTokenFromRequest(req: NextRequest) {
  const headersList = headers();
  const auth = headersList.get("Authorization");
  console.log("-\tGet the Header Authorization: ", auth);
  if (auth) {
    return auth;
  }

  const cookieHeader = req.headers.get("cookie") || "";
  const cookies1 = Object.fromEntries(
    cookieHeader.split("; ").map((cookie) => cookie.split("="))
  );

  console.log("The Cookies of this request is: ", cookies1);

  const token = cookies1.token;
  const tokenType = cookies1.tokenType;
  if (!token || !tokenType) {
    throw new Error("Authorization token or token type missing");
  }
  return `${tokenType}${token}`;
}

// get all posts | get post by postId
export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const postId = searchParams.get("postid");
  const authHeader = await getTokenFromRequest(req);
  console.log("[TEST]: the generated authHeader is:", authHeader);

  if (postId) {
    // const res = await fetch(`${API_BASE_URL}/posts/${postId}`, {
    //   method: "GET",
    //   headers: {
    //     Authorization: authHeader,
    //   },
    // });

    // if (!res.ok) {
    //   return NextResponse.error(); // Return an error response if the fetch fails
    // }

    // const data = await res.json();
    const data = fakeposts.find((p) => p.postId === postId);
    return NextResponse.json(data, { status: 200 });
  } else {
    // const res = await fetch(`${API_BASE_URL}/posts`, {
    //   method: "GET",
    //   headers: {
    //     Authorization: authHeader,
    //   },
    // });

    // if (!res.ok) {
    //   return NextResponse.error(); // Return an error response if the fetch fails
    // }

    // const data = await res.json();
    const data = fakeposts;
    return NextResponse.json(data, { status: 200 });
  }
}

export async function POST(req: NextRequest) {
  const authHeader = await getTokenFromRequest(req);
  const body = await req.json();

  const res = await fetch(`${API_BASE_URL}/posts/new-post`, {
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

export async function PUT(req: NextRequest) {
  const authHeader = await getTokenFromRequest(req);
  const body = await req.json();
  const action = req.nextUrl.searchParams.get("action") || "update";

  const updateURL =
    action === "addImage"
      ? `${API_BASE_URL}/posts/update/addImage`
      : action === "deleteImage"
      ? `${API_BASE_URL}/posts/update/deleteImage`
      : `${API_BASE_URL}/posts/update`;

  const res = await fetch(updateURL, {
    method: "PUT",
    headers: {
      Authorization: authHeader,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });

  const data = await res.json();
  return NextResponse.json(data, { status: res.status });
}

export async function DELETE(req: NextRequest) {
  const authHeader = await getTokenFromRequest(req);
  const postId = req.nextUrl.searchParams.get("postId");

  if (!postId) {
    return NextResponse.json({ error: "PostId is required" }, { status: 400 });
  }

  const res = await fetch(`${API_BASE_URL}/posts/delete?postId=${postId}`, {
    method: "DELETE",
    headers: {
      Authorization: authHeader,
    },
  });

  if (!res.ok) {
    return NextResponse.json(
      { error: "Failed to delete post" },
      { status: 500 }
    );
  }

  return NextResponse.json(null, { status: 204 });
}
