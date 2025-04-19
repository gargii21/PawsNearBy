
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../styles/nav.css";


function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const user = localStorage.getItem("userLoggedIn");
    setIsLoggedIn(!!user);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("userLoggedIn");
    localStorage.removeItem("token");
    setIsMenuOpen(false); // Close the menu
    navigate("/");
    window.location.reload();
  };

  const toggleMenu = () => {
    setIsMenuOpen(prev => !prev);
  };

  const handleLinkClick = () => {
    setIsMenuOpen(false); // Close the menu on any link click
  };

  return (
    <header>
      <h1><Link to="/" className="nav-logo">pawsnearby</Link></h1>
      <nav className={isMenuOpen ? "open" : ""}>
        <div><Link to="/" className="nav-link">Home</Link></div>
        <div><Link to="/become-caregiver" className="nav-link">Become a Caregiver</Link></div>
        <div><Link to="/community" className="nav-link">Community</Link></div>
        {isLoggedIn ? (
          <>
            <div><Link to="/dashboard" className="profile"><img src="/icons/profile.png" width={30} /></Link></div>
            <div><Link to="/" onClick={handleLogout} className="logout-btn">Logout</Link></div>
          </>
        ) : (
          <>
            <div><Link to="/login" className="nav-link">Login</Link></div>
            <div><Link to="/signup" className="signup-btn">Sign Up</Link></div>
          </>
        )}
      </nav>

      <div className="menu-toggle" onClick={toggleMenu}>☰</div>

      {isMenuOpen && (
        <div className="popup-menu">
          <div><Link to="/" className="nav-link" onClick={handleLinkClick}>Home</Link></div>
          <div><Link to="/become-caregiver" className="nav-link" onClick={handleLinkClick}>Become a Caregiver</Link></div>
          <div><Link to="/community" className="nav-link" onClick={handleLinkClick}>Community</Link></div>
          {isLoggedIn ? (
            <>
              <div><Link to="/dashboard" className="nav-link" onClick={handleLinkClick}>Dashboard</Link></div>
              <div><Link to="/" onClick={handleLogout} className="logout-btn">Logout</Link></div>
            </>
          ) : (
            <>
              <div><Link to="/login" className="nav-link" onClick={handleLinkClick}>Login</Link></div>
              <div><Link to="/signup" className="signup-btn" onClick={handleLinkClick}>Sign Up</Link></div>
            </>
          )}
        </div>
      )}
    </header>
  );
}

export default Navbar;
