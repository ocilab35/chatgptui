import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function ChangePassword() {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const ip = "http://localhost:5000/api";
  const navigate = useNavigate();

  const validateInputs = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError("Please enter a valid email address.");
      return false;
    }
    if (!otp || otp.length !== 6) {
      setError("Please enter a valid 6-digit OTP.");
      return false;
    }
    if (password.length < 8) {
      setError("Password must be at least 8 characters long.");
      return false;
    }
    if (password !== passwordConfirmation) {
      setError("Passwords do not match.");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    if (!validateInputs()) {
      setIsLoading(false);
      return;
    }

    try {
      const url = `${ip}/reset-password`;
      const response = await axios.post(url, {
        email,
        otp,
        password,
        password_confirmation: passwordConfirmation,
      });
      alert("Password reset successful!");
      navigate("/Password-Changed");
    } catch (err) {
      const message =
        err.response?.data?.message ||
        "Password reset failed. Please check your details and try again.";
      setError(message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center grow bg-center bg-no-repeat page-bg">
      <style
        dangerouslySetInnerHTML={{
          __html: `
            .page-bg {
              background-image: url('assets/media/images/2600x1200/bg-10.png');
            }
            .dark .page-bg {
              background-image: url('assets/media/images/2600x1200/bg-10-dark.png');
            }
          `,
        }}
      />
      <div className="card max-w-[370px] w-full">
        <form
          className="card-body flex flex-col gap-5 p-10"
          onSubmit={handleSubmit}
        >
          <div className="text-center">
            <h3 className="text-lg font-medium text-gray-900">
              Reset Password
            </h3>
            <span className="text-2sm text-gray-700">
              Enter your new password
            </span>
          </div>
          {error && (
            <div className="bg-red-100 text-red-700 p-3 rounded text-sm">
              {error}
            </div>
          )}
          <div className="flex flex-col gap-1">
            <label className="form-label text-gray-900">Email</label>
            <input
              className="input"
              placeholder="Enter Email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              disabled={isLoading}
            />
          </div>
          <div className="flex flex-col gap-1">
            <label className="form-label text-gray-900">OTP</label>
            <input
              className="input"
              placeholder="Enter 6-digit OTP"
              type="text"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              required
              disabled={isLoading}
            />
          </div>
          <div className="flex flex-col gap-1">
            <label className="form-label text-gray-900">New Password</label>
            <input
              className="input"
              placeholder="Enter New Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              disabled={isLoading}
            />
          </div>
          <div className="flex flex-col gap-1">
            <label className="form-label text-gray-900">
              Confirm New Password
            </label>
            <input
              className="input"
              placeholder="Confirm Password"
              type="password"
              value={passwordConfirmation}
              onChange={(e) => setPasswordConfirmation(e.target.value)}
              required
              disabled={isLoading}
            />
          </div>
          <button
            className="btn btn-primary flex justify-center grow"
            type="submit"
            disabled={isLoading}
          >
            {isLoading ? "Submitting..." : "Submit"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default ChangePassword;
