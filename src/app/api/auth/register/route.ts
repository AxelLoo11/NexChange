import { NextResponse } from "next/server";

const API_BASE_URL: string = `${process.env.NEXT_PUBLIC_USER_BACKEND_URL}/api/user-system/users`;

export async function POST(req: Request) {
  const { email, password, nickname, selectedAvatar } = await req.json();
  // console.log(
  //   `The receivced email: ${email}, password: ${password}, nickname: ${nickname}, avatar: ${selectedAvatar}.`
  // );

  const userServiceResponse = await fetch(`${API_BASE_URL}/new-user`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      userEmail: email,
      userPassword: password,
      userName: nickname,
      avatarURL: selectedAvatar,
    }),
  });

  if (!userServiceResponse.ok) {
    return NextResponse.json({ error: "Register Failed" }, { status: 401 });
  }

  return NextResponse.json({ message: "Register Success" }, { status: 200 });
}
