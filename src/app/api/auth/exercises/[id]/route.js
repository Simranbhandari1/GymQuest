import { NextResponse } from "next/server";
import Exercise from "@/lib/models/Exercise";
import { connectDB } from "@/lib/config/db";

export async function GET(req, { params }) {
  await connectDB();
  const exercise = await Exercise.findById(params.id).lean();
  if (!exercise) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json(exercise);
}
