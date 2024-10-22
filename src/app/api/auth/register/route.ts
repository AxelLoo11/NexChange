import { NextResponse } from "next/server";

const API_BASE_URL: string = "http://localhost:8081/api/user-system/users";

export async function POST(req: Request) {
  const { email, password, nickname, selectedAvatar } = await req.json();

  const userServiceResponse = await fetch(`${API_BASE_URL}/new-user`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      userEmail: email,
      userPassword: password,
      userName: nickname,
      userAvatarURL: selectedAvatar,
    }),
  });

  if (!userServiceResponse.ok) {
    return NextResponse.json({ error: "Register Failed" }, { status: 401 });
  }

  return NextResponse.json({ message: "Register Success" }, { status: 200 });
}
