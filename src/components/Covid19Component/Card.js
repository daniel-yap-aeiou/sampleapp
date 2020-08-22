import React from "react";
import CountUp from "react-countup";

const Cards = ({ data: { confirmed, recovered, deaths, lastUpdate } }) => {
  if (!confirmed) {
    return <div className="row">&nbsp;</div>;
  }

  return (
    <div className="row">
      <div className="card-deck">
        <div className="card">
          <div className="card-body">
            <h5 className="card-title">Infected</h5>

            <p className="card-text infected">
              <CountUp
                start={0}
                end={confirmed.value}
                duration={4.5}
                separator=","
              />
            </p>

            <p className="card-text">{new Date(lastUpdate).toDateString()}</p>
            <p className="card-text">Number Of Active Cases Of Covid-19</p>
          </div>
        </div>

        <div className="card">
          <div className="card-body">
            <h5 className="card-title">Recovered</h5>

            <p className="card-text recovered">
              <CountUp
                start={0}
                end={recovered.value}
                duration={3.5}
                separator=","
              />
            </p>

            <p className="card-text">{new Date(lastUpdate).toDateString()}</p>
            <p className="card-text">Number Of Recovered Cases Of Covid-19</p>
          </div>
        </div>

        <div className="card">
          <div className="card-body">
            <h5 className="card-title">Deaths</h5>

            <p className="card-text deaths">
              <CountUp
                start={0}
                end={deaths.value}
                duration={4}
                separator=","
              />
            </p>

            <p className="card-text">{new Date(lastUpdate).toDateString()}</p>
            <p className="card-text">Number Of Death caused by Covid-19</p>
          </div>
        </div>
      </div>

      <div className="col-12">
        <br />
        <br />
      </div>
    </div>
  );
};

export default Cards;
