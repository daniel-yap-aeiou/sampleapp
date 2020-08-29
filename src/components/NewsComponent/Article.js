import React from "react";

import { DIV, P, H6, A } from "../../Theme/styles";

const Article = (props) => {
  const { details } = props;
  return (
    <div
      className="col-lg-4 col-md-6 col-sm-6 col-xs-12"
      style={{ display: "inline-block" }}
    >
      <DIV className="card">
        <img
          className="card-img-top"
          src={details.urlToImage}
          alt="NewsImage"
        />
        <DIV className="card-block">
          <H6 className="card-title">
            <A href={details.url} target="_blank" rel="noopener noreferrer">
              {details.title}
            </A>
          </H6>
          <P className="card-text">{details.description}</P>
        </DIV>
      </DIV>
    </div>
  );
};

export default Article;
