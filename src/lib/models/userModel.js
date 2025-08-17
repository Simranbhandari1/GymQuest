// import mongoose, { Schema, model, models } from 'mongoose';

// const userSchema = new Schema({
//   email: { type: String, required: true, unique: true },
//   password: { type: String }, // 🔁 Made optional for Google users
//   name: { type: String },      // ✅ Add name (Google gives name)
//   image: { type: String },     // ✅ Add image (Google gives profile pic)
//   provider: { type: String },  // ✅ Track if user is 'google' or 'credentials'
//   refreshTokens: [String],
// });

// const User = models.User || model('User', userSchema);
// export default User;
import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  email: String,
  password: String,
  name: String,
  image: String,
  loginMethod: String,
  refreshTokens: {
    type: [String],
    default: [],
  },
});


const User = mongoose.models.User || mongoose.model("User", userSchema);
export default User;


