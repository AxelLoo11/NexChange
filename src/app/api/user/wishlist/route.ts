import { getTokenFromRequest } from "@/lib";
// import { fakeCheckPostWish, fakeGetUserWishListData } from "@/lib/fakeApiRouteFunc";
import { NextRequest, NextResponse } from "next/server";

const API_BASE_URL = `${process.env.NEXT_PUBLIC_USER_BACKEND_URL}/api/user-system/wish-posts`;

// Get wishpost by userid || determine whether post in wishlist
export async function GET(req: NextRequest) {
  const authHeader = await getTokenFromRequest(req);
  console.log("[TEST]: authheader: ", authHeader);
  const { searchParams } = new URL(req.url);

  const userId = searchParams.get("userid");
  const postId = searchParams.get("postid");

  if (!userId) {
    return new NextResponse("Missing necessary parameters", { status: 400 });
  }

  // Handle specific wish post compare
  if (postId) {
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

      // const data = fakeCheckPostWish(userId, postId);

      return NextResponse.json(data, { status: 200 });
    } catch (error) {
      console.log(error);
      return new NextResponse("Error comparing wish post", { status: 500 });
    }
  }

  // Handle fetching wish posts by userId
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

    // const data = fakeGetUserWishListData(userId);

    return new NextResponse(JSON.stringify(data), { status: 200 });
  } catch (error) {
    console.log(error);
    return new NextResponse("Error fetching wish posts", { status: 500 });
  }
}

// add new post to wishpost list
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

    // const data = await response.json();
    return new NextResponse("Add to wishlist success", { status: response.status });
  } catch (error) {
    console.log(error);
    return new NextResponse("Error creating wish post", { status: 500 });
  }
}

// remove post from wishpost list
export async function DELETE(request: NextRequest) {
  const authHeader = await getTokenFromRequest(request);
  const { searchParams } = new URL(request.url);
  const userId = searchParams.get("userId");
  const refPostId = searchParams.get("refPostId");

  if (!userId || !refPostId) {
    return new NextResponse("Missing userId or refPostId", {
      status: 400,
    });
  }

  try {
    const response = await fetch(
      `${API_BASE_URL}?userId=${userId}&refPostId=${refPostId}`,
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

    return new NextResponse("Wish post deleted successfully", { status: 200 });
  } catch (error) {
    console.log(error);
    return new NextResponse("Error deleting wish post", { status: 500 });
  }
}
