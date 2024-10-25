import { NextRequest, NextResponse } from "next/server";
import { getTokenFromRequest } from "@/lib";

const API_BASE_URL = `${process.env.NEXT_PUBLIC_BACKEND_URL}:8082/api/post-system/posts/update`;

// Add images ...
export async function POST(req: NextRequest) {
  const authHeader = await getTokenFromRequest(req);
  console.log("[TEST]: the generated authHeader is:", authHeader);

  const body = await req.json(); // {postImageURL, postId}

  const res = await fetch(`${API_BASE_URL}/addImage`, {
    method: "PUT",
    headers: {
      Authorization: authHeader,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    return NextResponse.json(
      { error: "Failed to add image ..." },
      { status: res.status }
    );
  }

  const data = await res.json();

  return NextResponse.json(data, { status: res.status });
}

// Remove images ...
export async function DELETE(req: NextRequest) {
  const authHeader = await getTokenFromRequest(req);
  console.log("[TEST]: the generated authHeader is:", authHeader);

  const { searchParams } = new URL(req.url);
  const postId = searchParams.get("postId");
  const postImageId = searchParams.get("postImageId");

  if (!postId || !postImageId) {
    return NextResponse.json(
      { error: "Missing necessary variables" },
      { status: 400 }
    );
  }

  const body = { postImageId: postImageId, postId: postId };
  const res = await fetch(`${API_BASE_URL}/deleteImage`, {
    method: "PUT",
    headers: {
      Authorization: authHeader,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    return NextResponse.json(
      { error: "Failed to remove image ..." },
      { status: res.status }
    );
  }

  const data = await res.json();

  return NextResponse.json(data, { status: res.status });
}
