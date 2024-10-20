import { getTokenFromRequest } from "@/lib";
import { NextRequest, NextResponse } from "next/server";

const API_BASE_URL = "http://localhost:8081/api/user-system/contacts";

export async function GET(req: NextRequest) {
  const authHeader = await getTokenFromRequest(req);
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
    return new NextResponse(JSON.stringify(data), { status: 200 });
  } catch (error) {
    return new NextResponse("Error fetch user contacts", { status: 500 });
  }
}

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
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to create new contact" },
      { status: 500 }
    );
  }
}

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
    return NextResponse.json(
      { error: "Failed to update contact" },
      { status: 500 }
    );
  }
}

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
    return NextResponse.json(
      { error: "Failed to delete contact" },
      { status: 500 }
    );
  }
}
