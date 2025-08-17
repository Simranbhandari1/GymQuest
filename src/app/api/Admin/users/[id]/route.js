import { NextResponse } from "next/server";
import { connectDB } from "@/lib/config/db";
import User from "@/lib/models/userModel";

export async function DELETE(request, { params }) {
  try {
    await connectDB();
    const userId = params.id;

    const deleted = await User.findByIdAndDelete(userId);

    if (!deleted) {
      return NextResponse.json({ success: false, message: "User not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true, message: "User deleted successfully" });
  } catch (error) {
    console.error("Delete Error:", error);
    return NextResponse.json({ success: false, message: "Server error" }, { status: 500 });
  }
}
