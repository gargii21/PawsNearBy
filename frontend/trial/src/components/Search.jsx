
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";


const LOCATIONIQ_ACCESS_TOKEN = "pk.f90fc5dcc2b7e34d5eae3f698db09200"; // Replace with your LocationIQ Access Token

const SearchBox = () => {
  const navigate = useNavigate();
  const [location, setLocation] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [service, setService] = useState("dog-walking");

  // Fetch suggestions from LocationIQ API
  const fetchSuggestions = async (query) => {
    if (query.length < 3) return;
    try {
      const res = await axios.get(`https://api.locationiq.com/v1/autocomplete.php`, {
        params: {
          key: LOCATIONIQ_ACCESS_TOKEN,
          q: query,
          countrycodes: "IN",
          limit: 5,
          format: "json",
        },
      });
      setSuggestions(res.data);
    } catch (error) {
      console.error("Error fetching location suggestions", error);
    }
  };

  // Handle search
  const handleSearch = () => {
    navigate(`/search-results?location=${location}&service=${service}`);
  };

  return (
    <>

      <div className="search-box">
        <h2>Find Trusted Pet Care</h2>

        {/* Location Input */}
        <input
          type="text"
          placeholder="Enter location (City, Pincode, etc.)"
          value={location}
          onChange={(e) => {
            setLocation(e.target.value);
            fetchSuggestions(e.target.value);
          }}
        />

        {/* Location Suggestions */}
        {suggestions.length > 0 && (
          <ul className="suggestions">
            {suggestions.map((item, index) => (
              <li
                key={index}
                onClick={() => {
                  setLocation(item.display_name);
                  setSuggestions([]); // Clear suggestions after selection
                }}
              >
                {item.display_name}
              </li>
            ))}
          </ul>
        )}

        {/* Service Selection */}
<div className="service-buttons">
  {["dog-walking", "boarding", "pet-sitting"].map((item) => (
    <button
      key={item}
      className={service === item ? "selected" : ""}
      onClick={() => setService(item)}
    >
      <img src={`/icons/${item}.png`} alt={item} />
      {item.replace("-", " ").replace(/\b\w/g, (char) => char.toUpperCase())} {/* Converts to Capital Case */}
    </button>
  ))}
</div>


        {/* Search Button */}
        <button className="search-btn" onClick={handleSearch}>
          Search
        </button>
      </div>

    </>
  );
};

export default SearchBox;
