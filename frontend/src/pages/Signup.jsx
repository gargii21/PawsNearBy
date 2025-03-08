import React, { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const Signup = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  return (
    <div className="auth-container">
      {/* Left side with heading */}
      <div className="auth-left">
        <h1>Join PawsNearby! <br /> Create an account to connect with pet caregivers.</h1>
      </div>

      {/* Right side with signup form */}
      <div className="auth-right">
        <div className="auth-box">
          <h2>Sign Up</h2>
          <form>
            <div className="input-group">
              <input type="email" placeholder="Enter your email" required />
            </div>
            <div className="input-group password-field">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Create password"
                required
              />
              <span onClick={() => setShowPassword(!showPassword)}>
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </span>
            </div>
            <div className="input-group password-field">
              <input
                type={showConfirmPassword ? "text" : "password"}
                placeholder="Confirm password"
                required
              />
              <span onClick={() => setShowConfirmPassword(!showConfirmPassword)}>
                {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
              </span>
            </div>
            <button type="submit" className="auth-button">Sign Up Now</button>
          </form>
          <p className="toggle-text">
            Already have an account? <a href="/login">Login</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;
