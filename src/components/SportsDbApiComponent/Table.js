import React, { useState, useEffect } from "react";
import { withRouter } from "react-router-dom";
import "./Index.css";
import { TH, TD } from "../../Theme/styles";

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
                <TH>Club</TH>
                <TH>Played</TH>
                <TH>Win</TH>
                <TH>Draw</TH>
                <TH>Loss</TH>
                <TH>GF</TH>
                <TH>GA</TH>
                <TH>GD</TH>
                <TH>Total</TH>
              </tr>
            </thead>
            <tbody>
              {data.map((d) => {
                return (
                  <tr key={d.teamid}>
                    <TD>{d.name}</TD>
                    <TD>{d.played}</TD>
                    <TD>{d.win}</TD>
                    <TD>{d.draw}</TD>
                    <TD>{d.loss}</TD>
                    <TD>{d.goalsfor}</TD>
                    <TD>{d.goalsagainst}</TD>
                    <TD>{d.goalsdifference}</TD>
                    <TD>{d.total}</TD>
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
