import { NextResponse } from "next/server";

export async function GET(req) {
  try {
    // Example: get token from cookies and decode user (update with your logic)
    const token = req.cookies.get("token")?.value;

    if (!token) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Decode the token or fetch user info here
    const user = { name: "Simran", email: "simran@example.com" }; // example

    return NextResponse.json(user);
  } catch (err) {
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
  }
}
