import mongoose from "mongoose";

const workoutSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    bodyPart: String,
    equipment: String,
    gifUrl: String,
    target: String,
    sets: Number,
    reps: Number,
    duration: String,
  },
  { timestamps: true }
);

const Workout = mongoose.models.Workout || mongoose.model("Workout", workoutSchema);

export default Workout;
