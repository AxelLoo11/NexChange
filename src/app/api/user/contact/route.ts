import { getTokenFromRequest } from "@/lib";
// import { fakeGetUserContactsData } from "@/lib/fakeApiRouteFunc";
import { NextRequest, NextResponse } from "next/server";

const API_BASE_URL = `${process.env.NEXT_PUBLIC_BACKEND_URL}:8081/api/user-system/contacts`;

// get contacts by userid
export async function GET(req: NextRequest) {
  const authHeader = await getTokenFromRequest(req);
  console.log("[TEST] AuthHeader: ", authHeader);
  const { searchParams } = new URL(req.url);

  const userId = searchParams.get("userid");

  if (!userId) {
    return new NextResponse("Missing necessary parameters", { status: 400 });
  }

  try {
    const response = await fetch(`${API_BASE_URL}/${userId}`, {
      method: "GET",
      headers: {
        Authorization: authHeader,
      },
    });

    if (!response.ok) {
      return new NextResponse("Failed to fetch user contacts", {
        status: response.status,
      });
    }

    const data = await response.json();

    // const data = fakeGetUserContactsData(userId);

    return new NextResponse(JSON.stringify(data), { status: 200 });
  } catch (error) {
    console.log(error);
    return new NextResponse("Error fetch user contacts", { status: 500 });
  }
}

// Add new contact
export async function POST(req: NextRequest) {
  const authHeader = await getTokenFromRequest(req);
  const body = await req.json();

  try {
    const response = await fetch(`${API_BASE_URL}/new-contact`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: authHeader,
      },
      body: JSON.stringify(body),
    });

    const data = await response.json();
    return NextResponse.json(data); // return the new created contact object ...
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: "Failed to create new contact" },
      { status: 500 }
    );
  }
}

// update contact
export async function PUT(req: NextRequest) {
  const authHeader = await getTokenFromRequest(req);
  const body = await req.json();

  try {
    const response = await fetch(`${API_BASE_URL}/update`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: authHeader,
      },
      body: JSON.stringify(body),
    });

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: "Failed to update contact" },
      { status: 500 }
    );
  }
}

// delete contact
export async function DELETE(req: NextRequest) {
  const authHeader = await getTokenFromRequest(req);
  const { searchParams } = new URL(req.url);
  const contactListId = searchParams.get("contactListId");
  const contactId = searchParams.get("contactId");

  try {
    const response = await fetch(
      `${API_BASE_URL}/delete?contactListId=${contactListId}&contactId=${contactId}`,
      {
        method: "DELETE",
        headers: {
          Authorization: authHeader,
        },
      }
    );

    if (response.ok) {
      return NextResponse.json({ message: "Contact deleted successfully" });
    } else {
      return NextResponse.json(
        { error: "Failed to delete contact" },
        { status: response.status }
      );
    }
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: "Failed to delete contact" },
      { status: 500 }
    );
  }
}
