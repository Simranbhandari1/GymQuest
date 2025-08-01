

// /app/api/admin/users/route.js
import { connectDB } from "@/app/lib/config/db";
import User from "@/app/lib/models/User";
import { NextResponse } from "next/server";

// Set your admin email here
const ADMIN_EMAIL = "admin@example.com";

export async function GET(request) {
  try {
    await connectDB();

    const email = request.nextUrl.searchParams.get("email");

    if (email !== ADMIN_EMAIL) {
      return NextResponse.json({ success: false, message: "Unauthorized access" }, { status: 401 });
    }

    const users = await User.find({}, "name email createdAt lastLogin isBlocked role");

    return NextResponse.json({ success: true, users });

  } catch (error) {
    console.error("Error fetching users:", error);
    return NextResponse.json({ success: false, error: "Server error" }, { status: 500 });
  }
}
