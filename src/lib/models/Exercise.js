import mongoose from "mongoose";

const ExerciseSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  thumbnail: { type: String, required: true },   // Thumbnail image or name
  youtubeUrl: { type: String, required: true },  // YouTube video link
  link: { type: String, required: true },        // External reference link
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.models.Exercise ||
  mongoose.model("Exercise", ExerciseSchema);
