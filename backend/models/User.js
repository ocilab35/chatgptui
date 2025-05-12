import mongoose from "mongoose";

// User model (update this)
const userSchema = new mongoose.Schema(
  {
    email: { type: String, required: true, unique: true },
    name: { type: String },
    profileLetter: { type: String },
    password: { type: String },
    otp: { type: String },
    otpExpires: { type: Date },
  },
  { timestamps: true }
);
const User = mongoose.model("User", userSchema);

export default User;
