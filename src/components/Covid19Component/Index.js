import React, { useEffect, useState } from "react";
import "./Covid19.css";

import Card from "./Card";
import CountryPicker from "./CountryPicker";
import Chart from "./Chart";
import { fetchData } from "./api/index";
import { useUtilContext } from "../../contexts/UtilContext";

function Covid19() {
  const utilContext = useUtilContext();

  const [state, setState] = useState({
    data: {},
    country: "",
    handleCountryChange: null,
  });

  const { data, country } = state;

  useEffect(utilContext.hideLoader, []);

  useEffect(() => {
    let mounted = true;
    let cancelToken1 = null;
    if (mounted) {
      fetchData()
        .then((data) => {
          cancelToken1 = data.cancelToken1;
          if (mounted) {
            setState((prevState) => ({
              ...prevState,
              data: data,
            }));
          }
        })
        .catch((err) => {
          console.log(err);
        });

      const handleCountryChange = async (country) => {
        const data = await fetchData(country);

        if (mounted) {
          setState((prevState) => ({
            ...prevState,
            data: data,
            country: country,
          }));
        }
      };

      setState((prevState) => ({
        ...prevState,
        handleCountryChange: handleCountryChange,
      }));
    }

    return () => {
      cancelToken1 && cancelToken1.cancel();
      mounted = false;
    };
  }, []);

  return (
    <div className="container covid-container">
      <div className="row">
        <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
          <Card data={data} />
          {state.handleCountryChange ? (
            <CountryPicker handleCountryChange={state.handleCountryChange} />
          ) : null}

          <Chart data={data} country={country} />
        </div>
      </div>
    </div>
  );
}

export default Covid19;
