import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/profileCards.css";

const ProfileCards = ({ profiles }) => {
  const navigate = useNavigate();

  const handleViewProfile = (profile) => {
    navigate(`/profile/${profile.prId}`);
  };

  const handleRequestClick = (profile) => {
    navigate(`/profile/${profile.prId}?request=true`);
  };

  return (
    <div className="profile-cards">
      {profiles.map((profile) => (
        <div key={profile.prId} className="profile-card">
          <h3>{profile.daycare_name}</h3>
          <p><strong>Service:</strong> {profile.service}</p>
          <p><strong>Location:</strong> {profile.city}</p>
          <p><strong>Fees:</strong> ₹{profile.fees}</p>
          <p><strong>Rating:</strong> {profile.rating}⭐</p>

          <button onClick={() => handleRequestClick(profile)}>Request</button>
          <button onClick={() => handleViewProfile(profile)}>View Profile</button>
        </div>
      ))}
    </div>
  );
};

export default ProfileCards;
