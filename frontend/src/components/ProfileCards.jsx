
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../styles/profileCards.css";

const ProfileCards = ({ profiles }) => {
  const navigate = useNavigate();
  const [cityMap, setCityMap] = useState({}); // To store the city for each profile based on address

  useEffect(() => {
    const fetchCity = async (address, prId) => {
      const apiKey = "pk.f90fc5dcc2b7e34d5eae3f698db09200";  // Reuse the existing API key
      const geocodeUrl = `https://us1.locationiq.com/v1/search.php?key=${apiKey}&q=${encodeURIComponent(address)}&format=json`;

      try {
        const response = await axios.get(geocodeUrl);
        const results = response.data;

        if (results.length > 0) {
          const city = results[0].address.city || results[0].address.town || results[0].address.village;
          setCityMap((prevCityMap) => ({
            ...prevCityMap,
            [prId]: city || "City not found",
          }));
        }
      } catch (error) {
        console.error("Error extracting city from address:", error);
        setCityMap((prevCityMap) => ({
          ...prevCityMap,
          [prId]: "Error fetching city",
        }));
      }
    };

    // Fetch city for each profile
    profiles.forEach((profile) => {
      if (profile.address) {
        fetchCity(profile.address, profile.prId);
      }
    });
  }, [profiles]);

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
          <p><strong>Location:</strong> {cityMap[profile.prId] || "Loading..."}</p>
          <p><strong>Fees:</strong> ₹{profile.fees}</p>
          <p><strong>Rating:</strong> 4⭐</p>
          <button onClick={() => handleRequestClick(profile)}>Request</button>
          <button onClick={() => handleViewProfile(profile)}>View Profile</button>
        </div>
      ))}
    </div>
  );
};

export default ProfileCards;
