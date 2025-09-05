import { NextResponse } from "next/server";
import Exercise from "@/lib/models/Exercise";
import { connectDB } from "@/lib/config/db";

export async function GET(req, context) {
  await connectDB();

  // ✅ Await params from context
  const { id } = await context.params;

  const exercise = await Exercise.findById(id).lean();
  if (!exercise) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  return NextResponse.json(exercise);
}
