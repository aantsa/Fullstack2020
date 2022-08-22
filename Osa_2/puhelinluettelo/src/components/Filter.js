import React from "react";

const Filter = ({ filter, handleFilterChange }) => {
  return (
    <div>
      <p>filter shown with: </p>
      <input value={filter} onChange={handleFilterChange} />
    </div>
  );
};

export default Filter;
