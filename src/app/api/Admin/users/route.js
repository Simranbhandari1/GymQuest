// /app/api/admin/users/route.js
import { connectDB } from "@/lib/config/db";
import { NextResponse } from "next/server";
import User from "@/lib/models/userModel";

const ADMIN_EMAIL = process.env.ADMIN_EMAIL;

export async function GET(request) {
  try {
    await connectDB();

    // Use query param for quick demo, replace with proper auth in prod
    const email = request.nextUrl.searchParams.get("email");

    if (email !== ADMIN_EMAIL) {
      return NextResponse.json(
        { success: false, message: "Unauthorized access" },
        { status: 401 }
      );
    }

    const users = await User.find({}, "name email createdAt lastLogin isBlocked role");

    const totalUsers = users.length;
    const loggedInUsers = users.filter((user) => user.lastLogin !== null).length;
    const inactiveUsers = totalUsers - loggedInUsers;

    return NextResponse.json({
      success: true,
      users,
      counts: {
        total: totalUsers,
        loggedIn: loggedInUsers,
        inactive: inactiveUsers,
      },
    });

  } catch (error) {
    console.error("Error fetching users:", error);
    return NextResponse.json(
      { success: false, error: "Server error" },
      { status: 500 }
    );
  }
}

export async function DELETE(request) {
  try {
    await connectDB();

    const { searchParams } = new URL(request.url);
    const userId = searchParams.get("id");

    if (!userId) {
      return NextResponse.json(
        { success: false, message: "User ID is required" },
        { status: 400 }
      );
    }

    const deletedUser = await User.findByIdAndDelete(userId);

    if (!deletedUser) {
      return NextResponse.json(
        { success: false, message: "User not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "User deleted successfully",
    });

  } catch (error) {
    console.error("Error deleting user:", error);
    return NextResponse.json(
      { success: false, message: "Server error" },
      { status: 500 }
    );
  }
}
