import React, { useState } from "react";
import ProfileModal from "./ProfileModal";
import "../styles/profileCards.css";

const ProfileCards = ({ profiles }) => {
  const [selectedProfile, setSelectedProfile] = useState(null);

  return (
    <section className="profile-cards">
      {profiles.map((profile) => (
        <div key={profile.prId} className="profile-card">
          <h3>{profile.daycare_name}</h3>
          <p><strong>Service:</strong> {profile.service}</p>
          <p><strong>Location:</strong> {profile.city || "Unknown City"}</p>
          <p><strong>Fees:</strong> ₹{profile.fees || 500}/hr</p>
          <p><strong>Rating:</strong> ⭐ {profile.rating || 4.5}</p>

          <div className="profile-buttons">
            <button onClick={() => setSelectedProfile(profile)}>View Profile</button>
            <button onClick={() => window.location.href = `/profile/${profile.prId}?request=true`}>Request</button>
          </div>
        </div>
      ))}

      {/* Modal */}
      {selectedProfile && (
        <ProfileModal 
          profile={selectedProfile} 
          onClose={() => setSelectedProfile(null)} 
        />
      )}
    </section>
  );
};

export default ProfileCards;
