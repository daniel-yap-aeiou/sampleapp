import React, { useState, useEffect } from "react";
import { withRouter } from "react-router-dom";

function List(props) {
  const [data, updateData] = useState([]);

  useEffect(() => {
    updateData((pv) => (pv = props.data));

    return () => {
      console.log("cleaned up");
    };
  }, [props.data]);

  return (
    <div className="row">
      {data && data.pastMatches
        ? data.pastMatches.map((m) => {
            return (
              <div className="col-lg-12 col-sm-12 col-md-12" key={m.idEvent}>
                {m.strVideo === undefined ||
                m.strVideo === null ||
                m.strVideo === "" ? (
                  <span>
                    {m.strHomeTeam} {m.intHomeScore} - {m.intAwayScore}{" "}
                    {m.strAwayTeam}
                  </span>
                ) : (
                  <a
                    href={m.strVideo || "#"}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {m.strHomeTeam} {m.intHomeScore} - {m.intAwayScore}{" "}
                    {m.strAwayTeam}
                  </a>
                )}

                <br />
              </div>
            );
          })
        : ""}
    </div>
  );
}

export default withRouter(List);
