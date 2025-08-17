import { NextResponse } from "next/server";
import { connectDB } from "@/lib/config/db";
import BMI from "@/lib/models/BMI";

export async function POST(req) {
  try {
    await connectDB();
    const body = await req.json();

    const bmiRecord = new BMI(body);
    await bmiRecord.save();

    return NextResponse.json({ success: true, message: "BMI saved!" });
  } catch (error) {
    console.error("BMI save error:", error);
    return NextResponse.json({ success: false, message: "BMI not saved" }, { status: 500 });
  }
}
