import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function EnterEmail() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate(); // For navigation
  const ip = "http://localhost:5000/api";

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      const url = `${ip}/send-otp`;
      const response = await axios.post(url, { email });

      if (response.data) {
        alert("Successful  sent email!");
        navigate("/Check-Email", { state: { email } }); // Navigate with email
      }
    } catch (err) {
      setError("Login failed. Please check your credentials.");
      console.error("Login error:", err);
    }
  };

  return (
    <div>
      <div className="flex min-h-screen items-center justify-center grow bg-center bg-no-repeat page-bg">
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
              />
            </div>
            {error && <p className="text-red-500 text-sm">{error}</p>}
            <button
              type="submit"
              className="btn btn-primary flex justify-center grow"
            >
              Continue
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default EnterEmail;
