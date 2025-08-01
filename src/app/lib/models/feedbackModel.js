import mongoose from "mongoose";

const feedbackSchema = new mongoose.Schema({
  name: String,
  image: String,
  company: String,
  stars: Number,
  text: String,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.models.Feedback || mongoose.model("Feedback", feedbackSchema);
