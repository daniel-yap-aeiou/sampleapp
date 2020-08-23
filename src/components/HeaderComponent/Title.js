import React from "react";
import { withRouter } from "react-router-dom";

import { useTitleContext } from "../../contexts/TitleContext";

function Title() {
  const titleContext = useTitleContext();

  return (
    <div className="container title">
      <div className="row">
        <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12 d-flex justify-content-center">
          <span className="h3">{titleContext.getTitle}</span>
        </div>
      </div>
    </div>
  );
}
export default withRouter(Title);
