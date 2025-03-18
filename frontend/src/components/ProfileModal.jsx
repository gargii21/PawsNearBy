import React from "react";
import "../styles/modal.css";

const ProfileModal = ({ profile, onClose }) => {
  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <span className="close-button" onClick={onClose}>&times;</span>

        <h2>{profile.daycare_name}</h2>
        <p><strong>Service:</strong> {profile.service}</p>
        <p><strong>Location:</strong> {profile.city || "Unknown City"}</p>
        <p><strong>Fees:</strong> ₹{profile.fees || 500}/hr</p>
        <p><strong>Rating:</strong> ⭐ {profile.rating || 4.5}</p>
        <p><strong>About:</strong> Experienced, loving caregiver available for pet sitting and walking.</p>

        <button onClick={() => window.location.href = `/profile/${profile.prId}?request=false`}>Request</button>
      </div>
    </div>
  );
};

export default ProfileModal;
