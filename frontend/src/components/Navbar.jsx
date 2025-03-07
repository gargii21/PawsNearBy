import React from "react";
import "../styles/styles.css"; // Import styles

function Navbar() {
  return (
    <header>
      <h1><a href="#Home">pawsnearby</a></h1>
      <nav>
        <div><a href="#">Home</a></div>
        <div><a href="#">Become a Caregiver</a></div>
        <div><a href="#">Login</a></div>
        <div><a href="#" className="signup-btn">Sign Up</a></div>
      </nav>
    </header>
  );
}

export default Navbar;
