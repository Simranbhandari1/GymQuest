// models/MealPlan.js
import mongoose from "mongoose";

const mealPlanSchema = new mongoose.Schema(
  {
    name: String,
    age: Number,
    gender: String,
    height: Number,
    weight: Number,
    goal: String,
    dietPreference: String,
    health: { type: String, default: "None" },
    htmlPlan: String,
  },
  { timestamps: true }
);

const MealPlan = mongoose.models.MealPlan || mongoose.model("MealPlan", mealPlanSchema);
export default MealPlan;
