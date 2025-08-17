import { NextResponse } from "next/server";
import Exercise from "@/lib/models/Exercise";
import { connectDB } from "@/lib/config/db";

export async function GET() {
  await connectDB();
  const exercises = await Exercise.find().sort({ createdAt: -1 }).lean();
  return NextResponse.json(exercises);
}

export async function POST(req) {
  await connectDB();
  const data = await req.json();
  const newExercise = await Exercise.create(data);
  return NextResponse.json(newExercise);
}
