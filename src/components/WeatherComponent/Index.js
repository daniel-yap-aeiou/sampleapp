import React, { useState, useEffect } from "react";
import { Spinner } from "react-bootstrap";
import KEY from "./key";
import { withRouter } from "react-router-dom";
import "./Index.css";
import Modal from "./Modal";

let enteredCity = [];

function Index(props) {
  const [city, setState] = useState("");
  const [msg, setMsg] = useState("");
  const [spinnerClassName, setSpinnerClassName] = useState("hide");
  const [weatherList, setWeatherList] = useState([]);
  const [cityList, setCityList] = useState([]);
  const [forecastList, setForecastList] = useState({});

  const handleInputChange = (e) => {
    const v = e.target.value;
    setState((pv) => (pv = v));
  };

  const closeForecastModal = () => {
    const modal = document.getElementById("forecastModal");
    modal.style.display = "none";
    setForecastList((pv) => (pv = {}));
  };

  const loadForecast = (e, city) => {
    e.preventDefault();

    if (city === undefined || city === null || city === "") return false;

    const foundItem = cityList.find((s) => s.id === city.toLocaleLowerCase());

    if (foundItem) {
      const coord = foundItem.coord;
      const part = "minutely,hourly";
      const url = `https://api.openweathermap.org/data/2.5/onecall?lat=${coord.lat}&lon=${coord.lon}&exclude=${part}&appid=${KEY}&units=metric`;

      fetch(url)
        .then((response) => response.json())
        .then((data) => {
          if (data.daily) {
            let forecast_1 = [];
            let count = 0;
            let newDate = new Date();

            data.daily.map((d) => {
              const { temp, weather } = d;
              const icon = `https://s3-us-west-2.amazonaws.com/s.cdpn.io/162656/${weather[0]["icon"]}.svg`;

              forecast_1.push({ count, temp, weather, icon, date: newDate });
              count++;
            });

            setForecastList(
              (pv) =>
                (pv = { location: foundItem.location, forecast: forecast_1 })
            );

            const modal = document.getElementById("forecastModal");
            modal.style.display = "block";
          }
        })
        .catch(() => {
          setMsg(
            (prevValue) => (prevValue = "Please search for a valid city 😩")
          );
          setSpinnerClassName((pv) => (pv = "hide"));
        });
    }
  };

  const handleOnSubmitViaClick = () => {
    if (city === undefined || city === "") return false;

    if (enteredCity && enteredCity.includes(city.toLocaleLowerCase())) {
      setMsg(
        (prevValue) => (prevValue = "You already know the weather for " + city)
      );
      setSpinnerClassName((pv) => (pv = "hide"));
      return false;
    }

    setSpinnerClassName((pv) => (pv = ""));

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${KEY}&units=metric`;

    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        const { main, name, sys, weather, coord } = data;
        const icon = `https://s3-us-west-2.amazonaws.com/s.cdpn.io/162656/${weather[0]["icon"]}.svg`;

        let wl = weatherList;
        wl.push({
          main,
          name,
          sys,
          weather,
          coord,
          icon,
          city: city.toLocaleLowerCase(),
        });
        setWeatherList((pv) => (pv = wl));

        setSpinnerClassName((pv) => (pv = "hide"));
        enteredCity.push(city.toLocaleLowerCase());

        if (
          cityList.findIndex((s) => s.id === city.toLocaleLowerCase()) === -1
        ) {
          let cl = cityList;
          cl.push({
            id: city.toLocaleLowerCase(),
            coord,
            location: name + ", " + sys.country,
          });
          setCityList((pv) => (pv = cl));
        }

        //loadForecast(coord);
      })
      .catch(() => {
        setMsg(
          (prevValue) => (prevValue = "Please search for a valid city 😩")
        );
        setSpinnerClassName((pv) => (pv = "hide"));
      });

    setMsg((prevValue) => (prevValue = ""));
    setState((prevValue) => (prevValue = ""));
  };

  useEffect(props.hideLoader, []);

  useEffect(() => {
    setState((prevValue) => (prevValue = "melbourne,au"));
    setTimeout(() => {
      document.getElementById("weatherSubmitButton").click();
    }, 200);

    return () => {
      enteredCity = [];
    };
  }, []);

  return (
    <div className="container">
      <div className="row">
        <div className="col-lg-12">
          <form className="">
            <input
              type="text"
              placeholder="Search for a city"
              className="form-control"
              value={city}
              onChange={handleInputChange}
            />
            <br />
            <button
              id="weatherSubmitButton"
              type="button"
              className="btn btn-primary"
              onClick={handleOnSubmitViaClick}
            >
              Submit
            </button>
            <Spinner animation="border" className={spinnerClassName} />
            &nbsp;<span className="msg">{msg}</span>
          </form>

          <section className="ajax-section">
            <div className="container">
              <Modal closeModal={closeForecastModal} data={forecastList} />

              <div className="cities row">
                {weatherList
                  ? weatherList.map((wl) => {
                      return (
                        <div
                          className="col-lg-3 col-md-3 col-sm-3 col-xs-3 city"
                          key={wl.name + "," + wl.sys.country}
                        >
                          <h2
                            className="city-name"
                            data-name={wl.name + "," + wl.sys.country}
                          >
                            <span>{wl.name}</span>
                            <sup>{wl.sys.country}</sup>
                          </h2>
                          <div className="city-temp">
                            {Math.round(wl.main.temp)}
                            <sup>°C</sup>
                          </div>
                          <figure>
                            <img
                              className="city-icon"
                              src={wl.icon}
                              alt={wl.weather[0]["description"]}
                            />
                            <figcaption>
                              {wl.weather[0]["description"]}
                            </figcaption>
                          </figure>
                          <div>
                            <button
                              className="btn btn-dark"
                              onClick={(e) =>
                                loadForecast(e, wl.city.toLocaleLowerCase())
                              }
                            >
                              Forecast
                            </button>
                          </div>
                        </div>
                      );
                    })
                  : ""}
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}

export default withRouter(Index);
