import React from "react";
import { withRouter } from "react-router-dom";

function Title(props) {
  const capitalize = (s) => {
    if (typeof s !== "string") return "";
    return s.charAt(0).toUpperCase() + s.slice(1);
  };
  const title = capitalize(
    props.location.pathname.substring(1, props.location.pathname.length)
  );

  return (
    <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12 d-flex justify-content-center">
      <span className="h3">{props.title || title}</span>
    </div>
  );
}
export default withRouter(Title);
