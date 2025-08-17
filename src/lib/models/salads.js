import mongoose from "mongoose";

const nutritionSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    nutrition: {
      type: Object,
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

const Nutrition = mongoose.models.Nutrition || mongoose.model("Nutrition", nutritionSchema);

export default Nutrition;
