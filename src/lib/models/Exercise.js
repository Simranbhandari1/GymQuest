import mongoose from "mongoose";

const StepSchema = new mongoose.Schema({
  image: String,         // Step image URL
  instruction: String    // Instruction text
});

const ExerciseSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  thumbnail: String,     // Card preview image
  youtubeUrl: String,    // For embedding video
  steps: [StepSchema],   // Array of steps
  defaultDuration: { type: Number, default: 30 },
  defaultSets: { type: Number, default: 3 },
  restSeconds: { type: Number, default: 30 },
  tags: [String],
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.models.Exercise || mongoose.model("Exercise", ExerciseSchema);
