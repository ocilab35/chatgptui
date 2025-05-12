import User from "../models/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import sendOtpEmail from "../utils/sendOtp.js";

// Input validation helpers
const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
const validatePassword = (password) => password && password.length >= 8;
const validateName = (name) => name && name.trim().length >= 2;

const authController = {
  // Signup
  signup: async (req, res) => {
    const { email, password, name } = req.body;

    try {
      // Input validation
      if (!validateEmail(email)) {
        return res.status(400).json({ message: "Invalid email format." });
      }
      if (!validatePassword(password)) {
        return res.status(400).json({
          message: "Password must be at least 8 characters long.",
        });
      }
      if (!validateName(name)) {
        return res.status(400).json({
          message: "Name must be at least 2 characters long.",
        });
      }

      // Check for existing user
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(409).json({ message: "Email already in use." });
      }

      // Clean name and generate profile letter
      const cleanName = name.trim().replace(/\s+/g, " ");
      const profileLetter = cleanName
        ? cleanName.charAt(0).toUpperCase()
        : email.charAt(0).toUpperCase();

      // Hash password
      const hashedPassword = await bcrypt.hash(password, 10);

      // Create user
      const user = new User({
        email,
        name: cleanName,
        profileLetter,
        password: hashedPassword,
      });

      await user.save();

      // Generate JWT
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
        expiresIn: "1h",
      });

      res.status(201).json({
        message: "User created successfully",
        token,
        user: {
          _id: user._id,
          email: user.email,
          name: user.name,
          profileLetter: user.profileLetter,
        },
      });
    } catch (err) {
      console.error("Signup error:", err);
      res.status(500).json({
        message: "Server error. Please try again later.",
      });
    }
  },

  // Signin
  signin: async (req, res) => {
    const { email, password } = req.body;

    try {
      // Input validation
      if (!validateEmail(email)) {
        return res.status(400).json({ message: "Invalid email format." });
      }
      if (!password) {
        return res.status(400).json({ message: "Password is required." });
      }

      // Find user
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(401).json({ message: "Invalid email or password." });
      }

      // Update profileLetter if missing
      if (!user.profileLetter) {
        const cleanName = user.name
          ? user.name.trim().replace(/\s+/g, " ")
          : "";
        user.profileLetter = cleanName
          ? cleanName.charAt(0).toUpperCase()
          : email.charAt(0).toUpperCase();
        await user.save();
      }

      // Verify password
      const match = await bcrypt.compare(password, user.password);
      if (!match) {
        return res.status(401).json({ message: "Invalid email or password." });
      }

      // Generate JWT
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
        expiresIn: "1h",
      });

      res.status(200).json({
        message: "Logged in successfully",
        token,
        user: {
          _id: user._id,
          email: user.email,
          name: user.name,
          profileLetter: user.profileLetter,
        },
      });
    } catch (err) {
      console.error("Signin error:", err);
      res.status(500).json({
        message: "Server error. Please try again later.",
      });
    }
  },

  // Google Auth
  googleAuth: async (req, res) => {
    const { email, name } = req.body;

    try {
      // Input validation
      if (!validateEmail(email)) {
        return res.status(400).json({ message: "Invalid email format." });
      }
      if (!validateName(name)) {
        return res.status(400).json({
          message: "Name must be at least 2 characters long.",
        });
      }

      // Find or create user
      let user = await User.findOne({ email });
      if (!user) {
        const cleanName = name.trim().replace(/\s+/g, " ");
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

      // Generate JWT
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
        expiresIn: "1h",
      });

      res.status(200).json({
        message: "Google authentication successful",
        token,
        user: {
          _id: user._id,
          email: user.email,
          name: user.name,
          profileLetter: user.profileLetter,
        },
      });
    } catch (err) {
      console.error("Google auth error:", err);
      res.status(500).json({
        message: "Server error. Please try again later.",
      });
    }
  },

  // Send OTP
  sendOtp: async (req, res) => {
    const { email } = req.body;

    try {
      // Input validation
      if (!validateEmail(email)) {
        return res.status(400).json({ message: "Invalid email format." });
      }

      // Find user
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(404).json({ message: "Email not found." });
      }

      // Generate and store OTP
      const otp = Math.floor(100000 + Math.random() * 900000).toString();
      user.otp = otp;
      user.otpExpires = Date.now() + 15 * 60 * 1000; // 15 minutes
      await user.save();

      // Send OTP email
      try {
        await sendOtpEmail(email, otp);
      } catch (emailError) {
        console.error("Email sending error:", emailError);
        return res.status(500).json({
          message: "Failed to send OTP. Please try again later.",
        });
      }

      res.status(200).json({ message: "OTP sent to your email." });
    } catch (err) {
      console.error("Send OTP error:", err);
      res.status(500).json({
        message: "Server error. Please try again later.",
      });
    }
  },

  // Reset Password
  resetPassword: async (req, res) => {
    const { email, otp, password, password_confirmation } = req.body;

    try {
      // Input validation
      if (!validateEmail(email)) {
        return res.status(400).json({ message: "Invalid email format." });
      }
      if (!otp || otp.length !== 6) {
        return res.status(400).json({ message: "OTP must be 6 digits." });
      }
      if (!validatePassword(password)) {
        return res.status(400).json({
          message: "Password must be at least 8 characters long.",
        });
      }
      if (password !== password_confirmation) {
        return res.status(400).json({ message: "Passwords do not match." });
      }

      // Find user and validate OTP
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(404).json({ message: "Email not found." });
      }
      if (user.otp !== otp || user.otpExpires < Date.now()) {
        return res.status(400).json({ message: "Invalid or expired OTP." });
      }

      // Update password
      user.password = await bcrypt.hash(password, 10);
      user.otp = undefined;
      user.otpExpires = undefined;
      await user.save();

      res.status(200).json({ message: "Password reset successfully." });
    } catch (err) {
      console.error("Reset password error:", err);
      res.status(500).json({
        message: "Server error. Please try again later.",
      });
    }
  },
};

export default authController;
