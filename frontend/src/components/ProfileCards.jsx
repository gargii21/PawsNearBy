import React from "react";

const ProfileCards = ({ profiles, setSelectedProfile }) => {
  return (
    <section className="profile-cards">
      {profiles.map((profile) => (
        <div key={profile.prId} className="profile-card">
          <h3>{profile.daycare_name}</h3>
          <p>{profile.service}</p>
          <button onClick={() => setSelectedProfile(profile)}>View on Map</button>
        </div>
      ))}
    </section>
  );
};

export default ProfileCards;
