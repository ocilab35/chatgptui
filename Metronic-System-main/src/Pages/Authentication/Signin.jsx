import React, { useContext, useState } from "react";
import { AuthContext } from "../../Context/AuthContext";

import { Link, useNavigate } from "react-router-dom";
import { auth, googleProvider } from "../../firebase";
import { signInWithPopup } from "firebase/auth";
function Signin() {
  const [email, setEmail] = useState("");
  const { login, googleAuth } = useContext(AuthContext);
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  // const ip = "https://emergencytime.techsops.com/api";
  const navigate = useNavigate(); // useNavigate hook

  // In the handleSubmit function of Signin.js
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await login(email, password);
      alert("Successfully logged in");
      navigate("/Dash-Board");
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
    }
  };
  const handleGoogleSignIn = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const googleUser = result.user;

      // Use the googleAuth function from AuthContext
      await googleAuth(googleUser.email, googleUser.displayName);

      alert("Successfully logged in with Google");
      navigate("/Dash-Board");
    } catch (error) {
      console.error("Google Sign-In Error:", error.message);
      setError(error.response?.data?.message || "Google login failed");
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
      <div className="flex items-center justify-center grow  bg-no-repeat page-bg min-h-screen  page-bg p-4">
        <div className="card max-w-[370px] w-full">
          <form
            action="#"
            className="card-body flex flex-col gap-5 p-10"
            id="sign_in_form"
            method="get"
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
            <div className="grid grid-cols-1 gap-2.5">
              <button
                type="button"
                className="btn btn-light btn-sm justify-center"
                onClick={handleGoogleSignIn}
              >
                <img
                  alt=""
                  className="size-3.5 shrink-0"
                  src="assets/media/brand-logos/google.svg"
                />{" "}
                Use Google
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
              />
            </div>
            <div className="flex flex-col gap-1">
              <div className="flex items-center justify-between gap-1">
                <label className="form-label font-normal text-gray-900">
                  Password
                </label>
                <Link className="text-2sm link shrink-0" to="Entere-Email">
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
            {error && <p className="text-red-500 text-sm">{error}</p>}
            <button
              className="btn btn-primary flex justify-center grow"
              type="submit"
            >
              Sign In
            </button>
          </form>
        </div>
      </div>
      {/* End of Page */}
      {/* Scripts */}
      {/* End of Scripts */}
    </div>
  );
}
export default Signin;
