import express from "express";
const router = express.Router();
import authController from "../controllers/authController.js";

router.post("/signup", authController.signup);
router.post("/signin", authController.signin);
router.post("/send-otp", authController.sendOtp);
router.post("/reset-password", authController.resetPassword);
router.post("/google-auth", authController.googleAuth);

export default router;
