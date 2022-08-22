import React, { useEffect, useState } from "react";
import axios from "axios";
import Countries from "./components/Countries";
import Country from "./components/Country";

const App = (props) => {
  const [countries, setCountries] = useState([]);
  const [filteredCountries, setFilteredCountries] = useState([]);

  useEffect(() => {
    axios.get("https://restcountries.com/v3.1/all").then((res) => {
      setCountries(res.data);
    });
  }, []);

  const setFilter = (e) => {
    setFilteredCountries(
      countries.filter((c) =>
        c.name.common.toLowerCase().includes(e.target.value.toLowerCase())
      )
    );
  };

  return (
    <div>
      find countries
      <input onChange={setFilter}></input>
      {filteredCountries.length === 1 ? (
        <Country country={filteredCountries[0]} />
      ) : null}
      {filteredCountries.length > 10 ? (
        <p>Too many matches, specify another filter</p>
      ) : (
        <Countries setCountryToShow={(country) => setFilteredCountries(country)} countriesToShow={filteredCountries} />
      )}
    </div>
  );
};

export default App;
