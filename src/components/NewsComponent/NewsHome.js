import React from "react";
import { connect } from "react-redux";
import Article from "./Article";

function NewsHome({ items, props }) {
  let views = "<div>Loading...</div>";

  if (items && items.length > 1) {
    views = Object.keys(items).map((article) => (
      <Article key={article} details={items[article]} />
    ));
  }

  return (
    <div className="container">
      <div className="col-12">
        <div className="card-group">{views}</div>
      </div>
      <br />
      <br />
      <br />
    </div>
  );
}

const mapStateToProps = (state, ownProps) => {
  return {
    items: state.newsReducer.items,
    props: ownProps,
  };
};

export default connect(mapStateToProps, null)(NewsHome);
