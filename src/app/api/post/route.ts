import { NextRequest, NextResponse } from "next/server";
import { getTokenFromRequest } from "@/lib";
// import { fakeGetAllPostData, fakeGetPostDataById } from "@/lib/fakeApiRouteFunc";

const API_BASE_URL = `${process.env.NEXT_PUBLIC_POST_BACKEND_URL}/api/post-system/posts`;

// get all posts | get post by postId
export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const postId = searchParams.get("postid");
  const authHeader = await getTokenFromRequest(req);
  console.log("[TEST]: the generated authHeader is:", authHeader);

  if (postId) {
    const res = await fetch(`${API_BASE_URL}/${postId}`, {
      method: "GET",
      headers: {
        Authorization: authHeader,
      },
    });

    if (!res.ok) {
      return NextResponse.error(); // Return an error response if the fetch fails
    }

    const data = await res.json();
    // const data = fakeGetPostDataById(postId);
    return NextResponse.json(data, { status: 200 });
  } else {
    const res = await fetch(`${API_BASE_URL}`, {
      method: "GET",
      headers: {
        Authorization: authHeader,
      },
    });

    if (!res.ok) {
      return NextResponse.error(); // Return an error response if the fetch fails
    }

    const data = await res.json();
    // const data = fakeGetAllPostData();
    return NextResponse.json(data, { status: 200 });
  }
}

// Publish new post ...
export async function POST(req: NextRequest) {
  const authHeader = await getTokenFromRequest(req);
  console.log("[TEST]: the generated authHeader is:", authHeader);

  const body = await req.json();

  const res = await fetch(`${API_BASE_URL}/new-post`, {
    method: "POST",
    headers: {
      Authorization: authHeader,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    return NextResponse.json(
      { error: "Failed to publish new post" },
      { status: 500 }
    );
  }

  // const data = await res.json();
  return NextResponse.json("Published new post ...", { status: res.status });
  // return NextResponse.json(body, { status: 200 });
}

// update post info (images not included ...)
export async function PUT(req: NextRequest) {
  const authHeader = await getTokenFromRequest(req);
  const body = await req.json();

  const res = await fetch(`${API_BASE_URL}/update`, {
    method: "PUT",
    headers: {
      Authorization: authHeader,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    return NextResponse.json(
      { error: "Failed to update post info" },
      { status: 500 }
    );
  }

  // const data = await res.json();
  return NextResponse.json("Update post success", { status: res.status });
}

// delete post ...
export async function DELETE(req: NextRequest) {
  const authHeader = await getTokenFromRequest(req);

  const { searchParams } = new URL(req.url);
  const postId = searchParams.get("postid");

  if (!postId) {
    return NextResponse.json({ error: "PostId is required" }, { status: 400 });
  }

  const res = await fetch(`${API_BASE_URL}/delete?postId=${postId}`, {
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

  return NextResponse.json(null, { status: 200 });
}
