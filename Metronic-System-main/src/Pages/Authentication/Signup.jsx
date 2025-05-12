import React, { useContext, useState } from "react";
import { AuthContext } from "../../Context/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import { auth, googleProvider } from "../../firebase";
import { signInWithPopup } from "firebase/auth";

function Signup() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const { register, googleAuth } = useContext(AuthContext);
  const navigate = useNavigate();

  const validateInputs = () => {
    if (!name || name.length < 2) {
      setError("Name must be at least 2 characters long.");
      return false;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError("Please enter a valid email address.");
      return false;
    }
    if (password.length < 8) {
      setError("Password must be at least 8 characters long.");
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
      await register(name, email, password);
      alert("Registration successful! You can now log in.");
      navigate("/Dash-Board");
    } catch (err) {
      setError(err.message || "Registration failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setError(null);
    setIsLoading(true);

    try {
      const result = await signInWithPopup(auth, googleProvider);
      const googleUser = result.user;
      await googleAuth(googleUser.email, googleUser.displayName);
      alert("Successfully registered with Google");
      navigate("/Dash-Board");
    } catch (error) {
      setError(
        error.message || "Google registration failed. Please try again."
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-center bg-no-repeat page-bg p-4">
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
          <div className="text-center mb-2.5">
            <h3 className="text-lg font-medium text-gray-900 leading-none mb-2.5">
              Sign up
            </h3>
            <div className="flex items-center justify-center">
              <span className="text-2sm text-gray-700 me-1.5">
                Already have an Account?
              </span>
              <Link className="text-2sm link" to="/Sign-In">
                Sign In
              </Link>
            </div>
          </div>
          {error && (
            <div className="bg-red-100 text-red-700 p-3 rounded text-sm">
              {error}
            </div>
          )}
          <div className="grid grid-cols-1 gap-2.5">
            <button
              type="button"
              className="btn btn-light btn-sm justify-center"
              onClick={handleGoogleSignIn}
              disabled={isLoading}
            >
              <img
                alt=""
                className="size-3.5 shrink-0"
                src="assets/media/brand-logos/google.svg"
              />{" "}
              {isLoading ? "Loading..." : "Use Google"}
            </button>
          </div>
          <div className="flex items-center gap-2">
            <span className="border-t border-gray-200 w-full"></span>
            <span className="text-2xs text-gray-600 uppercase">or</span>
            <span className="border-t border-gray-200 w-full"></span>
          </div>
          <div className="flex flex-col gap-1">
            <label className="form-label text-gray-900">Name</label>
            <input
              className="input"
              type="text"
              placeholder="Enter Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              disabled={isLoading}
            />
          </div>
          <div className="flex flex-col gap-1">
            <label className="form-label text-gray-900">Email</label>
            <input
              className="input"
              type="email"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              disabled={isLoading}
            />
          </div>
          <div className="flex flex-col gap-1">
            <label className="form-label font-normal text-gray-900">
              Password
            </label>
            <input
              className="input"
              placeholder="Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              disabled={isLoading}
            />
          </div>
          <button
            className="btn btn-primary flex justify-center grow"
            type="submit"
            disabled={isLoading}
          >
            {isLoading ? "Signing up..." : "Sign up"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default Signup;
