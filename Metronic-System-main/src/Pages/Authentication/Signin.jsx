import React, { useContext, useState } from "react";
import { AuthContext } from "../../Context/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import { auth, googleProvider } from "../../firebase";
import { signInWithPopup } from "firebase/auth";

function Signin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const { login, googleAuth } = useContext(AuthContext);
  const navigate = useNavigate();

  const validateInputs = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError("Please enter a valid email address.");
      return false;
    }
    if (!password) {
      setError("Password is required.");
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
      await login(email, password);
      alert("Successfully logged in");
      navigate("/Dash-Board");
    } catch (err) {
      setError(err.message || "Login failed. Please try again.");
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
      alert("Successfully logged in with Google");
      navigate("/Dash-Board");
    } catch (error) {
      setError(error.message || "Google login failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center grow bg-no-repeat page-bg min-h-screen p-4">
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
              Sign in
            </h3>
            <div className="flex items-center justify-center font-medium">
              <span className="text-2sm text-gray-700 me-1.5">
                Need an account?
              </span>
              <Link className="text-2sm link" to="/Sign-Up">
                Sign up
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
            <span className="text-2xs text-gray-500 font-medium uppercase">
              Or
            </span>
            <span className="border-t border-gray-200 w-full"></span>
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
              disabled={isLoading}
            />
          </div>
          <div className="flex flex-col gap-1">
            <div className="flex items-center justify-between gap-1">
              <label className="form-label font-normal text-gray-900">
                Password
              </label>
              <Link className="text-2sm link shrink-0" to="/Enter-Email">
                Forgot Password?
              </Link>
            </div>
            <div className="input" data-toggle-password="true">
              <input
                className="input"
                placeholder="Enter Password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                disabled={isLoading}
              />
              <button
                className="btn btn-icon"
                data-toggle-password-trigger="true"
                type="button"
              >
                <i className="ki-filled ki-eye text-gray-500 toggle-password-active:hidden"></i>
                <i className="ki-filled ki-eye-slash text-gray-500 hidden toggle-password-active:block"></i>
              </button>
            </div>
          </div>
          <label className="checkbox-group">
            <input
              className="checkbox checkbox-sm"
              name="check"
              type="checkbox"
              defaultValue={1}
            />
            <span className="checkbox-label">Remember me</span>
          </label>
          <button
            className="btn btn-primary flex justify-center grow"
            type="submit"
            disabled={isLoading}
          >
            {isLoading ? "Signing in..." : "Sign In"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default Signin;
