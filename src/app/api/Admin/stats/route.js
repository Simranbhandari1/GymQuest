import { connectDB } from "@/lib/config/db";
import User from "@/lib/models/userModel";
import MealPlan from "@/lib/models/MealPlan";
import BMI from "@/lib/models/BMI";
import ContactModel from "@/lib/models/ContactModel";
import Workout from "@/lib/models/Exercise";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    await connectDB();

    // Total counts
    const users = await User.countDocuments();
    const workouts = await Workout.countDocuments();
    const dietPlans = await MealPlan.countDocuments();
    const bmiChecks = await BMI.countDocuments();
    const contacts = await ContactModel.countDocuments();

    // 7-day login and signup activity
    const sevenDaysAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);

    const activityAggregation = await User.aggregate([
      {
        $match: {
          $or: [
            { createdAt: { $gte: sevenDaysAgo } },
            { lastLogin: { $gte: sevenDaysAgo } },
          ],
        },
      },
      {
        $project: {
          createdAt: {
            $dateToString: { format: "%Y-%m-%d", date: "$createdAt" },
          },
          lastLogin: {
            $cond: {
              if: { $gte: ["$lastLogin", sevenDaysAgo] },
              then: { $dateToString: { format: "%Y-%m-%d", date: "$lastLogin" } },
              else: null,
            },
          },
        },
      },
      {
        $project: {
          dates: {
            $setUnion: [
              [{ $ifNull: ["$createdAt", ""] }],
              [{ $ifNull: ["$lastLogin", ""] }],
            ],
          },
        },
      },
      { $unwind: "$dates" },
      {
        $group: {
          _id: "$dates",
          visits: { $sum: 1 },
        },
      },
      { $sort: { _id: 1 } },
    ]);

    // Fill all 7 days (even if data is missing)
    const today = new Date();
    const visits = Array.from({ length: 7 }, (_, i) => {
      const day = new Date(today);
      day.setDate(day.getDate() - (6 - i));
      const dateStr = day.toISOString().slice(0, 10);
      const found = activityAggregation.find((d) => d._id === dateStr);
      return {
        day: dateStr,
        visits: found ? found.visits : 0,
      };
    });

    // 📊 Nutrition plan generation activity in the last 7 days
    const nutritionAggregation = await MealPlan.aggregate([
      {
        $match: {
          createdAt: { $gte: sevenDaysAgo },
        },
      },
      {
        $group: {
          _id: {
            $dateToString: { format: "%Y-%m-%d", date: "$createdAt" },
          },
          count: { $sum: 1 },
        },
      },
      { $sort: { _id: 1 } },
    ]);

    const nutritionStats = Array.from({ length: 7 }, (_, i) => {
      const day = new Date(today);
      day.setDate(day.getDate() - (6 - i));
      const dateStr = day.toISOString().slice(0, 10);
      const found = nutritionAggregation.find((d) => d._id === dateStr);
      return {
        day: dateStr,
        nutritionPlans: found ? found.count : 0,
      };
    });

    return NextResponse.json({
      users,
      workouts,
      dietPlans,
      bmiChecks,
      contacts,
      visits,
      nutritionStats,
    });
  } catch (err) {
    console.error("Error fetching admin stats:", err);
    return NextResponse.json({ error: "Failed to fetch stats" }, { status: 500 });
  }
}
