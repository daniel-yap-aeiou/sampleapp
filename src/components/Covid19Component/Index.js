import React, { useEffect, useState } from "react";
import { withRouter } from "react-router-dom";
import "./Covid19.css";

import Card from "./Card";
import CountryPicker from "./CountryPicker";
import Chart from "./Chart";
import { fetchData } from "./api/index";

function Covid19(props) {
  const [state, setState] = useState({
    data: {},
    country: "",
  });

  useEffect(props.hideLoader, []);

  useEffect(() => {
    const data = fetchData();

    setState((prevState) => ({
      ...prevState,
      data: data,
    }));

    return () => {

    };
  }, []);

  const handleCountryChange = async (country) => {
    const data = await fetchData(country);

    setState((prevState) => ({
      ...prevState,
      data: data,
      country: country,
    }));
  };

  const { data, country } = state;

  return (
    <div className="container">
      <div className="row">
        <div className="col-12">
          <Card data={data} />
          <CountryPicker handleCountryChange={handleCountryChange} />
          <Chart data={data} country={country} />
        </div>
      </div>
    </div>
  );
}

export default withRouter(Covid19);
