import { useLocation } from "react-router-dom";

const SearchResults = () => {
  const queryParams = new URLSearchParams(useLocation().search);
  const location = queryParams.get("location");
  const service = queryParams.get("service");

  return (
    <div>
      <h1>Search Results</h1>
      <p><strong>Location:</strong> {location}</p>
      <p><strong>Service:</strong> {service}</p>
    </div>
  );
};

export default SearchResults;
