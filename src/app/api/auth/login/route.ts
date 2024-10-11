import { NextResponse } from "next/server";

// const userServiceUrl: string = "https://your-user-service.com/auth";

export async function POST(req: Request) {
  const { email, password } = await req.json();
  console.log(`The received email is ${email} and password is ${password}`);

  //   const userServiceResponse = await fetch(userServiceUrl, {
  //     method: 'POST',
  //     headers: {
  //       'Content-Type': 'application/json',
  //     },
  //     body: JSON.stringify({ email, password }),
  //   });

  //   if (!userServiceResponse.ok) {
  //     return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
  //   }

  //   const { token } = await userServiceResponse.json();

  //   // Return the JWT to the client
  //   return NextResponse.json({ token });

  // Mock validation: only allow login with these credentials
  const validEmail = "awstest11@mail.com";
  const validPassword = "awstest11";

  // Check if email and password are correct
  if (email === validEmail && password === validPassword) {
    // Mock JWT token creation
    const mockJWT = "mock-jwt-token";

    return NextResponse.json({ token: mockJWT }, { status: 200 });
  } else {
    return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
  }
}
