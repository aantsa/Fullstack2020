import React from "react";

const Countries = ({ countriesToShow, setCountryToShow }) => {
    if (countriesToShow.length === 1) return null;
  
    return countriesToShow.map((country) => (
      <div key={country.name.official}>
        {country.name.common}{" "}
        <button onClick={() => setCountryToShow([country])}>show</button>
      </div>
    ));
  };
  
  export default Countries;