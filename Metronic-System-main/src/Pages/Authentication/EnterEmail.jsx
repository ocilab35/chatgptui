import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function EnterEmail() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const ip = "http://localhost:5000/api";

  const validateInputs = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError("Please enter a valid email address.");
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
      const url = `${ip}/send-otp`;
      const response = await axios.post(url, { email });
      alert("OTP sent to your email!");
      navigate("/Check-Email", { state: { email } });
    } catch (err) {
      const message =
        err.response?.data?.message ||
        "Failed to send OTP. Please check your email and try again.";
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
            <h3 className="text-lg font-medium text-gray-900">Your Email</h3>
            <span className="text-2sm text-gray-700">
              Enter your email to reset password
            </span>
          </div>
          {error && (
            <div className="bg-red-100 text-red-700 p-3 rounded text-sm">
              {error}
            </div>
          )}
          <div className="flex flex-col gap-1">
            <label className="form-label font-normal text-gray-900">
              Email
            </label>
            <input
              className="input"
              placeholder="email@email.com"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              disabled={isLoading}
            />
          </div>
          <button
            type="submit"
            className="btn btn-primary flex justify-center grow"
            disabled={isLoading}
          >
            {isLoading ? "Sending..." : "Continue"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default EnterEmail;
