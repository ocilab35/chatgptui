import nodemailer from "nodemailer";
const sendOtp = async (email, otp) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.MAIL_USER,
      pass: process.env.MAIL_PASS,
    },
  });

  await transporter.sendMail({
    from: process.env.MAIL_USER,
    to: email,
    subject: "Password Reset OTP",
    text: `Your OTP is: ${otp}`,
  });
};

export default sendOtp;
