// /app/api/nutrition/save/route.js
import { NextResponse } from "next/server";
import { connectDB } from "@/lib/config/db";
import MealPlan from "@/lib/models/MealPlan";

export async function POST(req) {
  try {
    await connectDB();
    const body = await req.json();

    const { userId, recipeId, recipeTitle, recipeImage, sourceUrl } = body;

    // Don't save if recipeImage is missing or empty
    if (!recipeImage || recipeImage.trim() === "") {
      return NextResponse.json({ success: false, message: "Recipe has no image" }, { status: 400 });
    }

    // Prevent duplicate saves
    const existing = await UserRecipe.findOne({ userId, recipeId });
    if (existing) {
      return NextResponse.json({ success: false, message: "Already saved!" }, { status: 400 });
    }

    const newRecipe = new UserRecipe({
      userId,
      recipeId,
      recipeTitle,
      recipeImage,
      sourceUrl,
    });

    await newRecipe.save();

    return NextResponse.json({ success: true, message: "Recipe saved!" });
  } catch (error) {
    console.error("Save Recipe Error:", error);
    return NextResponse.json({ success: false, message: "Failed to save" }, { status: 500 });
  }
}
