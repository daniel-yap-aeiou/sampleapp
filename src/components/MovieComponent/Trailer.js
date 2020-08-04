import React, { useState, useEffect } from "react";
import { withRouter } from "react-router-dom";

function Trailer(props) {
  const [data, updateData] = useState([]);
  let count = 0;

  useEffect(() => {
    updateData((prevValue) => (prevValue = props.data));
    return () => {
      console.log("cleaned up");
    };
  }, [props.data]);

  return (
    <div className="row">
      <div className="col-lg-12">
        <br />
        {data && data.trailers
          ? data.trailers.map((m) => {
              count++;
              return (
                <span key={data.id + "-" + count}>
                  <span className="trailer-link">
                    <a
                      href={m}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn btn-sm btn-dark"
                    >
                      Trailer {count}
                    </a>
                  </span>
                  &nbsp;
                </span>
              );
            })
          : ""}
      </div>
    </div>
  );
}

export default withRouter(Trailer);
