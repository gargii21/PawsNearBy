import React, { useState } from "react";
import { useParams, useLocation } from "react-router-dom";
import RequestFormModal from "./RequestFormModal";
import "../styles/ProfilePage.css";

const ProfilePage = () => {
  const { id } = useParams();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const showRequest = queryParams.get("request") === "true";
  const [showForm, setShowForm] = useState(showRequest);

  // Dummy profile data
  const profile = {
    prId: id,
    username: "caregiver_" + id,
    daycare_name: "Happy Paws Boarding",
    service: "Pet Sitting",
    city: "Delhi",
    fees: 500,
    rating: 4.5,
    email: "happypaws@example.com",
    phone: "+91 9876543210",
    about:
      "Experienced caregiver who loves all pets! Available for boarding, walking, and sitting. Passionate about animal care and ensuring pets feel at home.",
    experience: "3 years",
    requestsHandled: 42,
    photo: "/images/pfp2.png",
    banner: "/images/banner3.png",
  };

  return (
    <div className="profile-fullscreen">
      <div className="profile-banner">
        <img src={profile.banner} alt="Banner" />
      </div>

      <div className="profile-page-container">
        <div className="profile-header">
          <div className="profile-avatar">
            <img src={profile.photo} alt={profile.daycare_name} />
          </div>
          <div className="profile-info">
            <h2>{profile.daycare_name}</h2>
            <p className="username">@{profile.username}</p>
            <p><strong>Location:</strong> {profile.city}</p>
            <p><strong>Email:</strong> {profile.email}</p>
            <p><strong>Phone:</strong> {profile.phone}</p>
            <button onClick={() => setShowForm(true)}>Request</button>
          </div>
        </div>

        <div className="profile-stats">
          <div className="stat-box">
            <h4>Service</h4>
            <p>{profile.service}</p>
          </div>
          <div className="stat-box">
            <h4>Fees</h4>
            <p>₹{profile.fees}/hr</p>
          </div>
          <div className="stat-box">
            <h4>Rating</h4>
            <p>⭐ {profile.rating}</p>
          </div>
          <div className="stat-box">
            <h4>Experience</h4>
            <p>{profile.experience}</p>
          </div>
          <div className="stat-box">
            <h4>Requests</h4>
            <p>{profile.requestsHandled}</p>
          </div>
        </div>

        <div className="bio">
          <h3>About</h3>
          <p>{profile.about}</p>
        </div>

        <div className="reviews-section">
          <h3>Reviews</h3>
          <div className="reviews-placeholder">
            No reviews yet. Be the first to leave a review!
          </div>
        </div>
      </div>

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
