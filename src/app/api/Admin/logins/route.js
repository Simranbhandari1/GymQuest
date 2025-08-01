import { connectDB } from "@/app/lib/config/db";
import User from "@/app/lib/models/User";
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";

// Replace with your actual admin email
const ADMIN_EMAIL = "admin_@gmail.com";

// JWT secret used while signing during login
const JWT_SECRET = process.env.JWT_SECRET;

export async function GET(request) {
  try {
    await connectDB();

    const authHeader = request.headers.get("authorization");

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return NextResponse.json({ success: false, message: "Missing or invalid token" }, { status: 401 });
    }

    const token = authHeader.split(" ")[1];

    let decoded;
    try {
      decoded = jwt.verify(token, JWT_SECRET);
    } catch (err) {
      return NextResponse.json({ success: false, message: "Invalid token" }, { status: 401 });
    }

    if (decoded.email !== ADMIN_EMAIL) {
      return NextResponse.json({ success: false, message: "Unauthorized access" }, { status: 401 });
    }

    const users = await User.find({}, "name email createdAt lastLogin isBlocked role");

    return NextResponse.json({ success: true, users });

  } catch (error) {
    console.error("Error fetching users:", error);
    return NextResponse.json({ success: false, error: "Server error" }, { status: 500 });
  }
}
