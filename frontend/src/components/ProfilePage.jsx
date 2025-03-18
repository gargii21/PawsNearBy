import React, { useState } from "react";
import { useParams, useLocation } from "react-router-dom";
import RequestFormModal from "./RequestFormModal";
import "../styles/profilePage.css";

const ProfilePage = () => {
  const { id } = useParams();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const showRequest = queryParams.get("request") === "true";

  const [showForm, setShowForm] = useState(showRequest);

  // Dummy profile data (later fetch from backend)
  const profile = {
    prId: id,
    daycare_name: "Caregiver " + id,
    service: "Pet Sitting",
    city: "Delhi",
    fees: 500,
    rating: 4.5,
    about: "Experienced caregiver who loves all pets! Available for boarding, walking, and sitting."
  };

  return (
    <div className="profile-page">
      <h2>{profile.daycare_name}</h2>
      <p><strong>Service:</strong> {profile.service}</p>
      <p><strong>Location:</strong> {profile.city}</p>
      <p><strong>Fees:</strong> ₹{profile.fees}/hr</p>
      <p><strong>Rating:</strong> ⭐ {profile.rating}</p>
      <p><strong>About:</strong> {profile.about}</p>

      <button onClick={() => setShowForm(true)}>Request</button>

      {showForm && (
        <RequestFormModal
          isOpen={showForm}
          onClose={() => setShowForm(false)}
          caregiverName={profile.daycare_name}
        />
      )}
    </div>
  );
};

export default ProfilePage;
