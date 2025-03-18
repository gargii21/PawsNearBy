import React from "react";

const Filters = () => {
  return (
    <aside className="filters">
      <h3>Filters</h3>
      <label>
        <input type="checkbox" /> Dog Walking
      </label>
      <label>
        <input type="checkbox" /> Boarding
      </label>
      <label>
        <input type="checkbox" /> Pet Sitting
      </label>
    </aside>
  );
};

export default Filters;
