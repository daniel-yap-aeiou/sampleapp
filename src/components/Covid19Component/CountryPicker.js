import React, { useState, useEffect } from "react";

import { fetchCountries } from "./api/index";

const Countries = ({ handleCountryChange }) => {
  const [countries, setCountries] = useState([]);

  useEffect(() => {
    const fetchAPI = async () => {
      setCountries(await fetchCountries());
    };

    if (countries.length === 0) {
      fetchAPI();
    }
  });

  return (
    <div className="container">
      <div className="row">
        <div className="col-xs-4 col-sm-4 col-md-4 col-lg-4">
          <select
            className="form-control"
            onChange={(e) => handleCountryChange(e.target.value)}
          >
            <option value="">Global</option>
            {countries.map((country, i) => (
              <option key={i} value={country}>
                {country}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
};

export default Countries;
