import mongoose from "mongoose";

const LoginLogSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  loginTime: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.models.LoginLog || mongoose.model("LoginLog", LoginLogSchema);
