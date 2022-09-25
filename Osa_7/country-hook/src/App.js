import { useState, useEffect } from "react";
import axios from "axios";
import { useCountry, useField } from "./hooks";

const App = () => {
  const name = useField("text");
  const [countryName, setCountryName] = useState("");
  const country = useCountry(countryName);

  const fetch = (e) => {
    e.preventDefault();
    setCountryName(name.value);
  };

  return (
    <div>
      <form onSubmit={fetch}>
        <input onChange={() => console.log("teas")} {...name} />
        <button>find</button>
      </form>

      <Country country={country} />
    </div>
  );
};

const Country = ({ country }) => {
  if (!country) {
    return <div>not found...</div>;
  }

  return (
    <div>
      <h3>{country.name.common}</h3>
      <div>population {country.population}</div>
      <div>capital {country.capital}</div>
      <img
        src={country.flags.png}
        height="100"
        alt={`flag of ${country.name.common}`}
      />
    </div>
  );
};

export default App;
