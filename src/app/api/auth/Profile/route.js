import { NextResponse } from "next/server";
import { writeFile } from "fs/promises";
import path from "path";
import { connectDB } from "@/lib/config/db";
import User from "@/lib/models/userModel";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

await connectDB(); // Make sure DB is connected

const JWT_SECRET = process.env.JWT_SECRET;

// Helper: Extract JWT token from cookie
function getTokenFromCookie(req) {
  const token = req.cookies.get("accessToken")?.value;
  return token || null;
}

// Helper: Verify token
function verifyToken(token) {
  try {
    return jwt.verify(token, JWT_SECRET);
  } catch {
    return null;
  }
}

export async function GET(req) {
  const token = getTokenFromCookie(req);
  const decoded = verifyToken(token);

  if (!decoded?.userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const user = await User.findById(decoded.userId).lean();
  if (!user) {
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }

  return NextResponse.json({
    name: user.name,
    email: user.email,
    image: user.image,
    username: user.username,
  });
}

export async function PUT(req) {
  const token = getTokenFromCookie(req);
  const decoded = verifyToken(token);

  if (!decoded?.userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const formData = await req.formData();
  const name = formData.get("name");
  const email = formData.get("email");
  const password = formData.get("password");
  const profilePic = formData.get("profilePic");

  const updates = {};
  if (name) updates.name = name;
  if (email) updates.email = email;
  if (password) updates.password = await bcrypt.hash(password, 10);

  // Handle profile picture
  if (profilePic && typeof profilePic === "object") {
    const bytes = await profilePic.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const filename = `${Date.now()}-${profilePic.name.replace(/\s/g, "-")}`;
    const filePath = path.join(process.cwd(), "public", "uploads", filename);
    await writeFile(filePath, buffer);

    updates.image = `/uploads/${filename}`;
  }

  const updatedUser = await User.findByIdAndUpdate(
    decoded.userId,
    { $set: updates },
    { new: true }
  ).lean();

  return NextResponse.json({ user: updatedUser });
}
