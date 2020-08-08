import React, { useState, useEffect } from "react";
import { withRouter } from "react-router-dom";
import "./Index.css";

function Table(props) {
  const [data, updateData] = useState([]);
  const [divClassName, setDivClassName] = useState("row hide");

  useEffect(() => {
    updateData((prevValue) => (prevValue = props.data));

    if (props.data && props.data.length > 0) {
      setDivClassName((pv) => (pv = "row"));
    } else {
        setDivClassName((pv) => (pv = "row hide"));  
    }

    return () => {
      console.log("cleaned up");
    };
  }, [props.data]);

  return (
    <div className={divClassName}>
      <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
        {data ? (
          <table className="table table-hover table-bordered">
            <thead>
              <tr>
                <th>Club</th>
                <th>Played</th>
                <th>Win</th>
                <th>Draw</th>
                <th>Loss</th>
                <th>GF</th>
                <th>GA</th>
                <th>GD</th>
                <th>Total</th>
              </tr>
            </thead>
            <tbody>
              {data.map((d) => {
                return (
                  <tr key={d.teamid}>
                    <td>{d.name}</td>
                    <td>{d.played}</td>
                    <td>{d.win}</td>
                    <td>{d.draw}</td>
                    <td>{d.loss}</td>
                    <td>{d.goalsfor}</td>
                    <td>{d.goalsagainst}</td>
                    <td>{d.goalsdifference}</td>
                    <td>{d.total}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        ) : (
          "NA"
        )}
      </div>
    </div>
  );
}

export default withRouter(Table);
