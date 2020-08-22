import React, { useEffect, useState } from "react";
import { withRouter } from "react-router-dom";
import "./Covid19.css";

import Card from "./Card";
import CountryPicker from "./CountryPicker";
import Chart from "./Chart";
import { fetchData } from "./api/index";
import { hideLoader } from "../../contexts/LoaderContext";

function Covid19(props) {
  const [state, setState] = useState({
    data: {},
    country: "",
  });

  const { data, country } = state;

  useEffect(hideLoader, []);

  useEffect(() => {
    fetchData()
      .then((data) => {
        setState((prevState) => ({
          ...prevState,
          data: data,
        }));
      })
      .catch((err) => {
        console.log(err);
      });

    return () => {};
  }, []);

  const handleCountryChange = async (country) => {
    const data = await fetchData(country);

    setState((prevState) => ({
      ...prevState,
      data: data,
      country: country,
    }));
  };

  return (
    <div className="container covid-container">
      <div className="row">
        <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
          <Card data={data} />
          <CountryPicker handleCountryChange={handleCountryChange} />
          <Chart data={data} country={country} />
        </div>
      </div>
    </div>
  );
}

export default withRouter(Covid19);
