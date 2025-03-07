import React from "react";

function Search() {
  return (
    <section className="search" id="search">
      <h3>Find Trusted Caregivers...</h3>
      <div className="search-box">
        <form id="searchForm">
          <div>
            <p>I am looking for: </p>
            <select id="service" required>
              <option value="">Select a Service</option>
              <option value="pet-sitting">Pet Sitting</option>
              <option value="dog-walking">Dog Walking</option>
              <option value="boarding">Boarding</option>
            </select>
          </div>
          <div>
            <p>Near</p>
            <input type="text" id="location" placeholder="Enter your city or zip code" required />
          </div>
          <button type="submit">Search</button>
        </form>
      </div>
    </section>
  );
}

export default Search;
