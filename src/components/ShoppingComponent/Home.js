import React from "react";
import { connect } from "react-redux";
import { addToCart, upVote, downVote } from "../actions/cartActions";
import "./Home.css";

function Home({ items, email, addToCart, upVote, downVote }) {
  if (!items || items.length < 1) {
    return (
      <div className="container">
        <div className="row">
          <div className="col-lg-12">No items found.</div>
        </div>
      </div>
    );
  }

  const handleClick = (id) => {
    addToCart(id);
  };
  const handleUpVote = (e, id) => {
    if (id && email) {
      upVote(id, email);

      if (e.target.nextSibling.classList.value.includes("on")) {
        e.target.nextSibling.className = "vote fa fa-arrow-down";
      }

      e.target.setAttribute("class", "vote on fa fa-arrow-up");
    }
  };
  const handleDownVote = (e, id) => {
    if (id && email) {
      downVote(id, email);

      if (e.target.previousSibling.classList.value.includes("on")) {
        e.target.previousSibling.className = "vote fa fa-arrow-up";
      }

      e.target.setAttribute("class", "vote on fa fa-arrow-down");
    }
  };

  let itemList = items.map((item) => {
    let upVoteClassName = "fa fa-arrow-up vote";
    let downVoteClassName = "fa fa-arrow-down vote";

    if (item.votes.length > 0) {
      if (items.votes && items.votes.includes(email)) {
        upVoteClassName = "fa fa-arrow-up vote on";
      }
    }

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
            <i
              className={upVoteClassName}
              aria-hidden="true"
              onClick={(e) => handleUpVote(e, item.id)}
              title="Up vote this item!"
            ></i>
            <i
              className={downVoteClassName}
              aria-hidden="true"
              onClick={(e) => handleDownVote(e, item.id)}
              title="Down vote this item!"
            ></i>
            <span className="vote count">{item.votes.length}</span>
          </p>
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
  const user = localStorage.getItem("user");
  const userJson = JSON.parse(user);

  return {
    items: state.cartReducer.items,
    email: userJson.email,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    addToCart: (id) => {
      dispatch(addToCart(id));
    },
    upVote: (id, user) => {
      dispatch(upVote(id, user));
    },
    downVote: (id, user) => {
      dispatch(downVote(id, user));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
