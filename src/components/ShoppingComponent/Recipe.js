import React, { useEffect, useRef } from "react";
import { connect } from "react-redux";

function Recipe({
  total,
  addShipping,
  substractShipping,
  removeAllItems,
}) {
  const inputEl = useRef(null);

  useEffect(() => {
    if (inputEl.current.checked) {
      substractShipping();
    }
    return () => {
      console.log("cleaned up");
    };
  }, [substractShipping]);

  const handleChecked = (e) => {
    if (e.target.checked) {
      addShipping();
    } else {
      substractShipping();
    }
  };

  const handleCheckout = (e) => {
    removeAllItems();
    checkoutSuccess();
  };

  const checkoutSuccess = () => {
    // Get the snackbar DIV
    var x = document.getElementById("snackbar");

    x.innerHTML = "Thanks for shopping with us!";
    // Add the "show" class to DIV
    x.className = "show";

    // After 3 seconds, remove the show class from DIV
    setTimeout(function () {
      x.className = x.className.replace("show", "");
    }, 3000);
  };

  return (
    <div className="container">
      <div className="collection">
        <li className="collection-item">
          <label>
            <input type="checkbox" ref={inputEl} onChange={handleChecked} />
            &nbsp;
            <span>Shipping(+6$)</span>
          </label>
        </li>
        <li className="collection-item">
          <b>Total: {total} $</b>
        </li>
      </div>
      <div className="checkout">
        <button className="btn btn-success" onClick={handleCheckout}>
          Checkout
        </button>
      </div>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    //addedItems: state.cartReducer.addedItems,
    total: state.cartReducer.total,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    addShipping: () => {
      dispatch({ type: "ADD_SHIPPING" });
    },
    substractShipping: () => {
      dispatch({ type: "SUB_SHIPPING" });
    },
    removeAllItems: () => {
      dispatch({ type: "REMOVE_ALL_ITEMS" });
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Recipe);
