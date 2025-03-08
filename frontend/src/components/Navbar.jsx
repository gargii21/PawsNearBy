import React from "react";
import { Link } from "react-router-dom"; // Import Link for navigation
import "../styles/styles.css"; // Keep your existing styles

function Navbar() {
  return (
    <header>
      <h1><Link to="/" className="nav-logo">pawsnearby</Link></h1> {/* Use Link for Home */}
      <nav>
        <div><Link to="/" className="nav-link">Home</Link></div>
        <div><Link to="#" className="nav-link">Become a Caregiver</Link></div>
        <div><Link to="/login" className="nav-link">Login</Link></div> {/* Redirect to Login */}
        <div><Link to="/signup" className="signup-btn">Sign Up</Link></div> {/* Redirect to Signup */}
      </nav>
    </header>
  );
}

export default Navbar;
