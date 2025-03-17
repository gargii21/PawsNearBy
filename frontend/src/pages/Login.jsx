import React, { useState } from "react";
import axios from "axios";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useNavigate } from "react-router-dom"; // Use navigate for smooth redirection

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate(); // React Router navigation

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
  
    try {
      const response = await axios.post("http://localhost:5000/login", {
        email,
        password,
      });
  
      console.log("Login successful:", response.data);
  
      // Store login state in localStorage
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("userLoggedIn", "true");
  
      // Force refresh to update navbar
      window.location.reload();
  
      // Redirect to dashboard
      window.location.href = "/dashboard";
    } catch (err) {
      console.error("Signup Error:", error);
        if (error.response) {
            setError(error.response.data.message); // Show backend error message
        } else {
            setError("Signup failed. Please try again.");
        }
    }
  };
  

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
          {error && <p className="error-message">{error}</p>}
          <form onSubmit={handleLogin}>
            <div className="input-group">
              <input 
                type="email" 
                placeholder="Enter your email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required 
              />
            </div>
            <div className="input-group password-field">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <span onClick={() => setShowPassword(!showPassword)}>
                {showPassword ? <FaEye /> : <FaEyeSlash />}
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
