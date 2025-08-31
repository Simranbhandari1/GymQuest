import { connectDB } from "@/lib/config/db";
import User from "@/lib/models/userModel";
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";

const ADMIN_EMAIL = "admin_@gmail.com";
const JWT_SECRET = process.env.JWT_SECRET;

export async function GET(request) {
  try {
    if (!JWT_SECRET) {
      return NextResponse.json(
        { success: false, message: "JWT_SECRET is not configured on the server" },
        { status: 500 }
      );
    }

    await connectDB();

    const authHeader = request.headers.get("authorization");

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return NextResponse.json(
        { success: false, message: "Missing or invalid token" },
        { status: 401 }
      );
    }

    const token = authHeader.split(" ")[1];

    let decoded;
    try {
      decoded = jwt.verify(token, JWT_SECRET);
    } catch (err) {
      return NextResponse.json(
        { success: false, message: "Invalid token" },
        { status: 401 }
      );
    }

    if (decoded.email !== ADMIN_EMAIL) {
      return NextResponse.json(
        { success: false, message: "Unauthorized access" },
        { status: 403 }
      );
    }

    const users = await User.find(
      {},
      "name email createdAt lastLogin isBlocked role"
    );

    return NextResponse.json({ success: true, users });
  } catch (error) {
    console.error("Error fetching users:", error);
    return NextResponse.json(
      { success: false, error: "Server error" },
      { status: 500 }
    );
  }
}
