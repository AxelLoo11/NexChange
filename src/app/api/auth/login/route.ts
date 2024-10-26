// import { mockCheckAuth } from "@/lib/fakeApiRouteFunc";
import { NextResponse } from "next/server";

const userServiceUrl: string = `${process.env.NEXT_PUBLIC_BACKEND_URL}:8081/api/user-system/auth/login`;

export async function POST(req: Request) {
  const { email, password } = await req.json();
  console.log(`calling ${userServiceUrl}`);

  const userServiceResponse = await fetch(userServiceUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ userEmail: email, userPassword: password }),
  });

  if (!userServiceResponse.ok) {
    return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
  }

  const { token, tokenType, userId } = await userServiceResponse.json();

  // Mock Test Part
  // const userId = mockCheckAuth(email, password);
  // if (userId === null) {
  //   return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
  // }
  // const token = "mock-jwt-token";
  // const tokenType = "Bearer ";

  // Create response object
  const response = NextResponse.json(
    { message: "Login successful", data: userId },
    { status: 200 }
  );

  // Set HttpOnly cookie for token and token type
  response.cookies.set("token", token, {
    httpOnly: true, // Makes the cookie HttpOnly
    secure: false, // Ensures it's sent over HTTPS [Set to false just because no certificate QAQ]
    path: "/", // Available across your site
    sameSite: "strict", // Prevents CSRF attacks
  });

  response.cookies.set("tokenType", tokenType, {
    httpOnly: true, // Makes the cookie HttpOnly
    secure: false, // Ensures it's sent over HTTPS [Set to false just because no certificate QAQ]
    path: "/", // Available across your site
    sameSite: "strict", // Prevents CSRF attacks
  });

  response.cookies.set("userid", userId, {
    httpOnly: true,
    secure: false, // Ensures it's sent over HTTPS [Set to false just because no certificate QAQ]
    path: "/", // Available across your site
    sameSite: "strict", // Prevents CSRF attacks
  });

  return response;
}
