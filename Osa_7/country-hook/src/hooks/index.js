import { useState, useEffect } from "react";
import axios from "axios";

export const useField = (type) => {
  const [value, setValue] = useState("");

  const onChange = (event) => {
    setValue(event.target.value);
  };

  return {
    type,
    value,
    onChange,
  };
};

export const useCountry = (countryName) => {
  const [country, setCountry] = useState("");

  useEffect(() => {
    if (countryName) {
      axios
        .get(`https://restcountries.com/v3.1/name/${countryName}?fullText=true`)
        .then((res) => {
          setCountry(res.data[0]);
        })
        .catch((err) => {
          console.log(err);
          setCountry("");
        });
    }
  }, [countryName]);

  return country;
};
