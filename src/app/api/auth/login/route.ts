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

  //   const { token, tokenType, userid } = await userServiceResponse.json();

  //   // Return the JWT to the client
  //   return NextResponse.json({ token });

  // Mock validation: only allow login with these credentials
  const validEmail = "awstest11@mail.com";
  const validPassword = "awstest11";

  // Check if email and password are correct
  if (email === validEmail && password === validPassword) {
    // Mock JWT token creation
    const mockJWT = "mock-jwt-token";
    const mockJWTType = "Bearer ";

    const mockUserid = "testuser003";

    // Create response object
    const response = NextResponse.json({ message: "Login successful" }, {status: 200});

    // Set HttpOnly cookie for token and token type
    response.cookies.set("token", mockJWT, {
      httpOnly: true, // Makes the cookie HttpOnly
      secure: true, // Ensures it's sent over HTTPS
      path: "/", // Available across your site
      sameSite: "strict", // Prevents CSRF attacks
    });

    response.cookies.set("tokenType", mockJWTType, {
      httpOnly: true, // Makes the cookie HttpOnly
      secure: true, // Ensures it's sent over HTTPS
      path: "/", // Available across your site
      sameSite: "strict", // Prevents CSRF attacks
    });

    response.cookies.set("userid", mockUserid, {
      httpOnly: false,
      secure: true, // Ensures it's sent over HTTPS
      path: "/", // Available across your site
      sameSite: "strict", // Prevents CSRF attacks
    });

    return response;
  } else {
    return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
  }
}
