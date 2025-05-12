import React from "react";
import { Link, useLocation } from "react-router-dom";

function CheckEmail() {
  const location = useLocation();
  const email = location.state?.email || "your email"; // Get email from state

  return (
    <div>
      <div className="flex  min-h-screen items-center justify-center grow bg-center bg-no-repeat page-bg">
        <div className="card max-w-[440px] w-full">
          <div className="card-body p-10">
            <div className="flex justify-center py-10">
              <img alt="image" className="dark:hidden max-h-[130px]" src="assets/media/illustrations/30.svg" />
              <img alt="image" className="light:hidden max-h-[130px]" src="assets/media/illustrations/30-dark.svg" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 text-center mb-3">Check your email</h3>
            <div className="text-2sm text-center text-gray-700 mb-7.5">
              Please click the link sent to your email
              <br />
              <a className="text-2sm text-gray-800 font-medium hover:text-primary-active" href="#">
                {email}
              </a>
              <br />
              to reset your password. Thank you
            </div>
            <div className="flex justify-center mb-5">
              <Link className="btn btn-primary flex justify-center" to="/Change-Password">
                Skip for now
              </Link>
            </div>
            <div className="flex items-center justify-center gap-1">
              <span className="text-xs text-gray-600">Didn’t receive an email?</span>
              <Link className="text-xs font-medium link" to="/Entere-Email">Resend</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CheckEmail;
