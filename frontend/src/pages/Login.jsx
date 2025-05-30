import React, { useState } from "react";
import axios from "axios";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import "../styles/auth.css";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const response = await axios.post("http://localhost:5000/login", {
        email,
        password,
      },
      { withCredentials: true }
    );

      // Store login state
      localStorage.setItem("token", response.data.token);
      //localStorage.setItem("isProvider", res.data.isProvider);
      localStorage.setItem("userLoggedIn", "true");

      // Force refresh
      window.location.href = "/dashboard";
      //window.location.reload();

      // if (res.data.isProvider) {
      //   navigate("/provider-dashboard");
      // } else {
      //   navigate("/user-dashboard");
      // }

    } catch (err) {
      console.error("Login Error:", err);
      if (err.response) {
        setError(err.response.data.message);
      } else {
        setError("Login failed. Please try again.");
      }
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-left">
      </div>

      <div className="auth-right">
        <div className="auth-box">
          <h2>Login</h2>
          {error && <p className="error-message">{error}</p>}
          <form onSubmit={handleLogin}>
            <div className="input-group">
              <input type="email" placeholder="Enter your email" value={email} onChange={(e) => setEmail(e.target.value)} required />
            </div>
            <div className="input-group password-field">
              <input type={showPassword ? "text" : "password"} placeholder="Enter your password" value={password} onChange={(e) => setPassword(e.target.value)} required />
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
