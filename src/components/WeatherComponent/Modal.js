import React from "react";
import { withRouter } from "react-router-dom";
import Moment from "react-moment";
import "./Modal.css";

function Modal(props) {
  return (
    <div id="forecastModal" className="forecast-modal">
      <div className="forecast-modal-content">
        <div className="forecast-modal-header">
          <h2>
            Forecast{" "}
            {props.data && props.data.location
              ? " - " + props.data.location
              : ""}
            <span className="forecast-close" onClick={() => props.closeModal()}>
              &times;
            </span>
          </h2>
        </div>
        <div className="forecast-modal-body container">
          <div className="row">
            {props.data && props.data.forecast
              ? props.data.forecast.map((fl) => {
                  return (
                    <div
                      className="col-lg-3 col-md-3 col-sm-3 col-xs-3 forecast"
                      key={fl.count}
                    >
                      <div className="city-temp">
                        {Math.round(fl.temp.day)}
                        <sup>°C</sup>
                      </div>
                      <figure>
                        <img
                          className="city-icon"
                          src={fl.icon}
                          alt={fl.weather[0]["description"]}
                        />
                        <figcaption>
                          {fl.weather[0]["description"]}
                          <br />
                          <span className="badge badge-secondary">
                            <Moment
                              format="dddd YYYY-MM-DD"
                              add={{ days: fl.count }}
                            >
                              {fl.date}
                            </Moment>
                          </span>
                        </figcaption>
                      </figure>
                    </div>
                  );
                })
              : ""}
          </div>
        </div>
        <div className="forecast-modal-footer">
          <button className="btn btn-dark" onClick={() => props.closeModal()}>
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

export default withRouter(Modal);
