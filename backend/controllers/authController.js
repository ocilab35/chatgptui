import User from "../models/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import sendOtpEmail from "../utils/sendOtp.js";

const authController = {
  // authController.js (updated with better name handling)
  signup: async (req, res) => {
    const { email, password, name } = req.body;
    try {
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(400).json({ message: "User already exists" });
      }

      const hashedPassword = await bcrypt.hash(password, 10);

      // Clean name by removing extra spaces and get first character
      const cleanName = name ? name.trim().replace(/\s+/g, " ") : "";
      const profileLetter = cleanName
        ? cleanName.charAt(0).toUpperCase()
        : email.charAt(0).toUpperCase();

      const user = new User({
        email,
        name: cleanName,
        profileLetter,
        password: hashedPassword,
      });

      await user.save();
      res.status(201).json({ message: "User created successfully", user });
    } catch (err) {
      res
        .status(400)
        .json({ message: "User creation failed", error: err.message });
    }
  },

  signin: async (req, res) => {
    const { email, password } = req.body;
    try {
      const user = await User.findOne({ email });
      if (!user) throw new Error("User not found");

      // If user doesn't have profileLetter (for existing users), set it
      if (!user.profileLetter) {
        const cleanName = user.name
          ? user.name.trim().replace(/\s+/g, " ")
          : "";
        user.profileLetter = cleanName
          ? cleanName.charAt(0).toUpperCase()
          : email.charAt(0).toUpperCase();
        await user.save();
      }

      const match = await bcrypt.compare(password, user.password);
      if (!match) throw new Error("Invalid credentials");
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
      res.json({ message: "Logged in", token, user });
    } catch (err) {
      res.status(401).json({ message: "Login failed", error: err.message });
    }
  },

  googleAuth: async (req, res) => {
    const { email, name } = req.body;
    try {
      let user = await User.findOne({ email });
      if (!user) {
        const cleanName = name ? name.trim().replace(/\s+/g, " ") : "";
        const profileLetter = cleanName
          ? cleanName.charAt(0).toUpperCase()
          : email.charAt(0).toUpperCase();

        user = new User({
          email,
          name: cleanName,
          profileLetter,
          password: null,
        });
        await user.save();
      } else if (!user.profileLetter) {
        const cleanName = user.name
          ? user.name.trim().replace(/\s+/g, " ")
          : "";
        user.profileLetter = cleanName
          ? cleanName.charAt(0).toUpperCase()
          : email.charAt(0).toUpperCase();
        await user.save();
      }

      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
      res.json({
        message: "Google Auth successful",
        token,
        user: {
          _id: user._id,
          email: user.email,
          name: user.name,
          profileLetter: user.profileLetter,
        },
      });
    } catch (err) {
      res
        .status(500)
        .json({ message: "Google Auth failed", error: err.message });
    }
  },
  // ... rest of your authController methods

  sendOtp: async (req, res) => {
    const { email } = req.body;
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    try {
      const user = await User.findOneAndUpdate(
        { email },
        { otp, otpExpires: Date.now() + 15 * 60000 },
        { new: true, upsert: true }
      );
      await sendOtpEmail(email, otp);
      res.json({ message: "OTP sent." });
    } catch (err) {
      res
        .status(400)
        .json({ message: "Failed to send OTP.", error: err.message });
    }
  },

  resetPassword: async (req, res) => {
    const { email, otp, password, password_confirmation } = req.body;
    if (password !== password_confirmation) {
      return res.status(400).json({ message: "Passwords do not match" });
    }

    try {
      const user = await User.findOne({ email });
      if (!user || user.otp !== otp || user.otpExpires < Date.now()) {
        return res.status(400).json({ message: "Invalid or expired OTP" });
      }

      user.password = await bcrypt.hash(password, 10);
      user.otp = undefined;
      user.otpExpires = undefined;
      await user.save();

      res.json({ message: "Password updated successfully" });
    } catch (err) {
      res
        .status(500)
        .json({ message: "Error resetting password", error: err.message });
    }
  },
};

export default authController;
