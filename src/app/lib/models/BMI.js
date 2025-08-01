import mongoose from "mongoose";

const bmiSchema = new mongoose.Schema({
  feet: Number,
  inches: Number,
  weight: Number,
  age: Number,
  gender: String,
  bmi: String,
  category: String,
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const BMI = mongoose.models.BMI || mongoose.model("BMI", bmiSchema);
export default BMI;
