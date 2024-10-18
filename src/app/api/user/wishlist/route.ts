import { NextRequest, NextResponse } from "next/server";

const API_BASE_URL = "http://localhost:8081/api/user-system/wish-posts";

async function getTokenFromRequest(req: NextRequest) {
  const cookieHeader = req.headers.get("cookie") || "";
  const cookies = Object.fromEntries(
    cookieHeader.split("; ").map((cookie) => cookie.split("="))
  );

  const token = cookies.token;
  const tokenType = cookies.tokenType;
  if (!token || !tokenType) {
    throw new Error("Authorization token or token type missing");
  }
  return `${tokenType}${token}`; // the space is inclued in tokenType (?) not sure
}

export async function GET(req: NextRequest) {
  const authHeader = await getTokenFromRequest(req);
  const { searchParams, pathname } = new URL(req.url);

  // Handle specific wish post compare
  if (pathname.includes("/compare")) {
    const userId = searchParams.get("userId");
    const postId = searchParams.get("postId");

    if (!userId || !postId) {
      return new NextResponse("Missing userId or postId", { status: 400 });
    }

    try {
      const response = await fetch(
        `${API_BASE_URL}/compare?userId=${userId}&postId=${postId}`,
        {
          method: "GET",
          headers: {
            Authorization: authHeader,
          },
        }
      );

      if (!response.ok) {
        return new NextResponse("Failed to compare wish post", {
          status: response.status,
        });
      }

      const data = await response.json();
      return new NextResponse(JSON.stringify(data), { status: 200 });
    } catch (error) {
      return new NextResponse("Error comparing wish post", { status: 500 });
    }
  }

  // Handle fetching wish posts by userId
  const segments = pathname.split("/");
  const userId = segments[segments.length - 1]; // Extract userId from URL

  try {
    const response = await fetch(`${API_BASE_URL}/${userId}`, {
      method: "GET",
      headers: {
        Authorization: authHeader,
      },
    });

    if (!response.ok) {
      return new NextResponse("Failed to fetch wish posts", {
        status: response.status,
      });
    }

    const data = await response.json();
    return new NextResponse(JSON.stringify(data), { status: 200 });
  } catch (error) {
    return new NextResponse("Error fetching wish posts", { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  const authHeader = await getTokenFromRequest(request);
  const body = await request.json(); // Get the request body

  try {
    const response = await fetch(`${API_BASE_URL}/new-wishpost`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: authHeader,
      },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      return new NextResponse("Failed to create wish post", {
        status: response.status,
      });
    }

    const data = await response.json();
    return new NextResponse(JSON.stringify(data), { status: 201 });
  } catch (error) {
    return new NextResponse("Error creating wish post", { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  const authHeader = await getTokenFromRequest(request);
  const { searchParams } = new URL(request.url);
  const wishPostId = searchParams.get("wishPostId");
  const wishPostListId = searchParams.get("wishPostListId");

  if (!wishPostId || !wishPostListId) {
    return new NextResponse("Missing wishPostId or wishPostListId", {
      status: 400,
    });
  }

  try {
    const response = await fetch(
      `${API_BASE_URL}?wishPostId=${wishPostId}&wishPostListId=${wishPostListId}`,
      {
        method: "DELETE",
        headers: {
          Authorization: authHeader,
        },
      }
    );

    if (!response.ok) {
      return new NextResponse("Failed to delete wish post", {
        status: response.status,
      });
    }

    return new NextResponse("Wish post deleted successfully", { status: 204 });
  } catch (error) {
    return new NextResponse("Error deleting wish post", { status: 500 });
  }
}
