import React, { useState } from "react";
import Filters from "../components/Filters";
import ProfileCards from "../components/ProfileCards";
import SearchMap from "../components/SearchMap";


const SearchResults = () => {
  const [selectedProfile, setSelectedProfile] = useState(null);

  const profiles = [
    { id: 1, name: "John Doe", service: "Dog Walking", lat: 12.9716, lng: 77.5946 },
    { id: 2, name: "Jane Smith", service: "Pet Boarding", lat: 28.7041, lng: 77.1025 },
    { id: 3, name: "Alice Brown", service: "Pet Sitting", lat: 19.076, lng: 72.8777 },
  ];

  return (
    <div className="search-results-container">
      <Filters />
      <ProfileCards profiles={profiles} setSelectedProfile={setSelectedProfile} />
      <SearchMap profiles={profiles} setSelectedProfile={setSelectedProfile} />
    </div>
  );
};

export default SearchResults;
