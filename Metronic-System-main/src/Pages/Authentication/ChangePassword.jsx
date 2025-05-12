import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function ChangePassword() {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [password, setPassword] = useState("");
  const [password_confirmation, setPasswordConfirmation] = useState("");
  const [error, setError] = useState(null);
  const ip = "http://localhost:5000/api";

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    if (!email) {
      setError("Email is required.");
      return;
    }

    if (password.length < 8) {
      setError("Password must be at least 8 characters long.");
      return;
    }

    if (password !== password_confirmation) {
      setError("Passwords do not match.");
      return;
    }

    try {
      const url = `${ip}/reset-password`;
      const response = await axios.post(url, {
        email,
        otp,
        password,
        password_confirmation,
      });
      console.log("Password reset successful:", response.data);
      alert("Password reset successful!");
      navigate("/Password-Changed");
    } catch (err) {
      console.error("Error:", err.response ? err.response.data : err);
      setError(
        err.response?.data?.message ||
          "Password reset failed. Please check your details and try again."
      );
    }
  };

  return (
    <div>
      <style
        dangerouslySetInnerHTML={{
          __html:
            "\n   .page-bg {\n\t\t\tbackground-image: url('assets/media/images/2600x1200/bg-10.png');\n\t\t}\n\t\t.dark .page-bg {\n\t\t\tbackground-image: url('assets/media/images/2600x1200/bg-10-dark.png');\n\t\t}\n  ",
        }}
      />
      <div className="flex min-h-screen items-center justify-center grow bg-center bg-no-repeat page-bg">
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
            <div className="flex flex-col gap-1">
              <label className="form-label text-gray-900">Email</label>
              <input
                className="input"
                placeholder="Enter Email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
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
                value={password_confirmation}
                onChange={(e) => setPasswordConfirmation(e.target.value)}
                required
              />
            </div>
            <div className="flex flex-col gap-1">
              <label className="form-label text-gray-900">Enter OTP</label>
              <input
                className="input"
                placeholder="Enter OTP"
                type="text"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                required
              />
            </div>
            {error && <p className="text-red-500 text-sm">{error}</p>}
            <button
              className="btn btn-primary flex justify-center grow"
              type="submit"
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default ChangePassword;
