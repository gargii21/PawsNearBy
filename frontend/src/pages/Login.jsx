import React, { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="auth-container">
      {/* Left side with heading */}
      <div className="auth-left">
        <h1>Welcome Back! <br /> Log in to find the best pet care services.</h1>
      </div>

      {/* Right side with login form */}
      <div className="auth-right">
        <div className="auth-box">
          <h2>Login</h2>
          <form>
            <div className="input-group">
              <input type="email" placeholder="Enter your email" required />
            </div>
            <div className="input-group password-field">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                required
              />
              <span onClick={() => setShowPassword(!showPassword)}>
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </span>
            </div>
            <button type="submit" className="auth-button">Login Now</button>
          </form>
          <p className="toggle-text">
            Don't have an account? <a href="/signup">Sign Up</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
