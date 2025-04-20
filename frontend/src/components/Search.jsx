import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";


const LOCATIONIQ_ACCESS_TOKEN = "pk.f90fc5dcc2b7e34d5eae3f698db09200"; 

const Search = () => {
  const navigate = useNavigate();
  const [location, setLocation] = useState("");
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const [suggestions, setSuggestions] = useState([]);
  const [service, setService] = useState("pet-sitting");

  // Fetch location suggestions
  const fetchSuggestions = async (query) => {
    if (query.length < 3) return;
    try {
      const res = await axios.get(`https://api.locationiq.com/v1/autocomplete.php`, {
        params: {
          key: LOCATIONIQ_ACCESS_TOKEN,
          q: query,
          countrycodes: "IN", // Limit to India
          limit: 5,
          format: "json",
        },
      });
      setSuggestions(res.data);
    } catch (error) {
      console.error("Error fetching location suggestions", error);
    }
  };

  // Handle location selection
  const handleLocationSelect = (item) => {
    setLocation(item.display_name);
    setLatitude(item.lat);
    setLongitude(item.lon);
    setSuggestions([]); // Clear suggestions after selection
  };

  // Handle search button click
  const handleSearch = () => {
    if (!latitude || !longitude) {
      alert("Please select a location from suggestions!");
      return;
    }

    // Redirect to the search results page with lat/lon params
    navigate(
      `/search?lat=${latitude}&lon=${longitude}&service=${service}`
    );
  };

  return (
    <>
 
      <div className="search-box" id="search-box">
        <h2>Find Trusted Pet Care</h2>
        <div className="search-input">
           {/* Service Selection */}
           <p>I am looking for </p>
        <div className="service-buttons">
          {["pet-sitting","boarding", "dog-walking"].map((item) => (
            <button
              key={item}
              className={service === item ? "selected" : ""}
              onClick={() => setService(item)}
            >
              <img src={`/PawsNearBy/icons/${item}.png`} alt={item} className="icon" />
              {item.replace("-", " ").replace(/\b\w/g, (char) => char.toUpperCase())}
            </button>
          ))}
        </div>

        {/* Location Input */}
       <p>Near</p>
       <div className="loc-container">
        <input
          type="text" id="loc"
          placeholder="Enter location (city, pincode, etc.)"
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
              <li key={index} onClick={() => handleLocationSelect(item)}>
                {item.display_name}
              </li>
            ))}
          </ul>
        )}
        </div>

       <br/>

        {/* Search Button */}
        <button className="search-btn" onClick={handleSearch}>
          Search
        </button>
        </div>
      </div>
    </>
  );
};

export default Search;
