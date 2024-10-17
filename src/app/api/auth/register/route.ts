import { NextResponse } from "next/server";

const userServiceUrl: string =
  "http://localhost:8081/api/user-system/auth/login";

export async function POST(req: Request) {
  const { email, password, nickname, avatar } = await req.json();

  const userServiceResponse = await fetch(userServiceUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      userEmail: email,
      userPassword: password,
      nickname: nickname,
      avatar: avatar,
    }),
  });

  if (!userServiceResponse.ok) {
    return NextResponse.json({ error: "Register Failed" }, { status: 401 });
  }

  return NextResponse.json({ message: "Register Success" }, { status: 200 });
}
