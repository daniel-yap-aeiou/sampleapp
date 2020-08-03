import React, { useState, useEffect } from "react";
import { Spinner } from "react-bootstrap";
import KEY from "./key";
import { withRouter } from "react-router-dom";
import "./Index.css";

let enteredCity = [];

function Index(props) {
  const [city, setState] = useState("");
  const [msg, setMsg] = useState("");
  const [spinnerClassName, setSpinnerClassName] = useState("hide");

  const handleInputChange = (e) => {
    const v = e.target.value;
    setState((prevValue) => (prevValue = v));
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
        const { main, name, sys, weather } = data;
        const icon = `https://s3-us-west-2.amazonaws.com/s.cdpn.io/162656/${weather[0]["icon"]}.svg`;

        const div = document.createElement("div");
        div.classList.add("city");
        div.classList.add("col-lg-3");
        const markup = `
        <h2 className="city-name" data-name="${name},${sys.country}">
          <span>${name}</span>
          <sup>${sys.country}</sup>
        </h2>
        <div className="city-temp">${Math.round(main.temp)}<sup>°C</sup></div>
        <figure>
          <img className="city-icon" src="${icon}" alt="${
          weather[0]["description"]
        }">
          <figcaption>${weather[0]["description"]}</figcaption>
        </figure>
      `;
        div.innerHTML = markup;

        const list = document.querySelector(".ajax-section .cities");
        list.appendChild(div);
        setSpinnerClassName((pv) => (pv = "hide"));
        enteredCity.push(city.toLocaleLowerCase());
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
              <div className="cities row"></div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}

export default withRouter(Index);
