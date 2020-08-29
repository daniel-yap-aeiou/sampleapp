import React from "react";
import { withRouter } from "react-router-dom";

import { useTitleContext } from "../../contexts/TitleContext";

import { H3 } from "../../Theme/styles";

function Title() {
  const titleContext = useTitleContext();

  return (
    <div className="container title">
      <div className="row">
        <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12 d-flex justify-content-center">
          <H3>{titleContext.getTitle}</H3>
        </div>
      </div>
    </div>
  );
}
export default withRouter(Title);
