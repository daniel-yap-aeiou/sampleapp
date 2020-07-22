import React from "react";
import { connect } from "react-redux";
import { addToCart } from "../actions/cartActions";

function Home({ items, addToCart }) {
  const handleClick = (id) => {
    addToCart(id);
  };
  let itemList = items.map((item) => {
    return (
      <div className="card" key={item.id}>
        <div className="card-img-top">
          <img src={item.img} alt={item.title} style={{ width: "295px" }} />
          <div className="card-body">
            <h5 className="card-title">{item.title}</h5>

            <p className="card-text">{item.desc}</p>
          </div>
        </div>
        <div className="card-body">
          <p>
            <b>Price: {item.price}$</b>
            &nbsp;&nbsp;&nbsp;
            <button
              className="btn btn-sm btn-dark"
              onClick={() => {
                handleClick(item.id);
              }}
            >
              <i className="material-icons">add</i>
            </button>
          </p>
        </div>
      </div>
    );
  });

  return (
    <div className="container">
      <h3 className="center">Our items</h3>
      <div className="box">{itemList}</div>
      <br />
      <br />
      <br />
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    items: state.cartReducer.items,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    addToCart: (id) => {
      dispatch(addToCart(id));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
