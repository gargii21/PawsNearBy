import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../styles/styles.css";

function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const user = localStorage.getItem("userLoggedIn");
    setIsLoggedIn(!!user);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("userLoggedIn");
    localStorage.removeItem("token");
    navigate("/");
    window.location.reload(); // Refresh to update navbar
  };

  return (
    <header>
      <h1><Link to="/" className="nav-logo">pawsnearby</Link></h1>
      <nav>
        <div><Link to="/" className="nav-link">Home</Link></div>
        <div><Link to="/become-caregiver" className="nav-link">Become a Caregiver</Link></div>
        <div><Link to="/community" className="nav-link">Community</Link></div>

        {isLoggedIn ? (
          <>
            
            <div><Link to="/dashboard" className="profile"><img src="/icons/profile.png" width={30}/></Link></div>
            <div><Link to="/" onClick={handleLogout} className="logout-btn">Logout</Link></div>
          </>
        ) : (
          <>
            <div><Link to="/login" className="nav-link">Login</Link></div>
            <div><Link to="/signup" className="signup-btn">Sign Up</Link></div>
          </>
        )}
      </nav>
    </header>
    
  );
}

export default Navbar;
