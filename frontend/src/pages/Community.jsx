import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";


const Community = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const user = localStorage.getItem("userLoggedIn");
    setIsLoggedIn(!!user);
  }, []);

  return (
    <div className="community">
      {isLoggedIn ? (
        <div className="community-content">
          <h1>Welcome to the Community! 🎉</h1>
          <p>Connect with other pet lovers, share experiences, and find pet care tips!</p>

          {/* Placeholder for posts */}
          <div className="community-posts">
            <h2>Recent Posts 🐾</h2>
            <p>(Posts and discussions will be displayed here.)</p>
          </div>

          {/* Add Post Button */}
          <button className="add-post-btn">+ Add a Post</button>
        </div>
      ) : (
        <div className="community-about">
          <h1>Join the PawsNearby Community! 🐶🐱</h1>
          <p>Connect with pet lovers, share stories, and get advice on pet care.</p>
          <Link to="/signup" className="join-btn">Sign Up to Join</Link>
        </div>
      )}
    </div>
  );
};

export default Community;
