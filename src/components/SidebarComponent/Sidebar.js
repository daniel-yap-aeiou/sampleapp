import React, { useState, useEffect } from "react";
import { Link, withRouter, useHistory } from "react-router-dom";
import { connect } from "react-redux";
//import Logo from "../../logo.svg";

import { menus } from "../../constants/menu";
import { User } from "../UserComponent/User";
import "./Sidebar.css";

import { useUserContext } from "../../contexts/UserContext";
import { useUtilContext } from "../../contexts/UtilContext";

function Sidebar({ itemCount }) {
  const userContext = useUserContext();
  const utilContext = useUtilContext();
  const history = useHistory();
  const [showLoggedInMenu, updateShowLoggedInMenu] = useState("none");
  const [loggedInAs, updateLoggedInAs] = useState(null);

  useEffect(() => {
    if (userContext.IsUserLoggedIn() == null) {
      updateShowLoggedInMenu((prevValue) => (prevValue = "none"));
    } else {
      updateShowLoggedInMenu((prevValue) => (prevValue = "block"));
      updateLoggedInAs(
        (prevValue) => (prevValue = userContext.GetUserEmailAddress())
      );
    }
  }, [userContext.IsUserLoggedIn()]);

  const signout = () => {
    utilContext.showLoader();
    userContext.SignOut();
    updateShowLoggedInMenu((prevValue) => (prevValue = "none"));
    updateLoggedInAs((prevValue) => (prevValue = null));
    history.push("/login");
    utilContext.closeNav();
  };

  const handleMenuOnClick = () => {
    utilContext.closeNav();
    utilContext.showLoader();
  };

  return !userContext.IsUserLoggedIn() ? (
    ""
  ) : (
    <div>
      <div id="mySidebar" className="sidebar">
        <a href="##" className="closebtn" onClick={utilContext.closeNav}>
          &times;
        </a>
        {menus.menuLeft1.map((m) => {
          return (
            <Link
              key={m.id}
              to={m.to}
              style={{ display: showLoggedInMenu }}
              onClick={() => handleMenuOnClick()}
            >
              {m.text}
            </Link>
          );
        })}

        {menus.menuLeftDropdown1.map((m) => {
          return (
            <Link
              key={m.id}
              to={m.to}
              style={{ display: showLoggedInMenu }}
              onClick={() => handleMenuOnClick()}
            >
              {m.text}
            </Link>
          );
        })}

        {menus.menuLeftDropdown2.map((m) => {
          return (
            <Link
              key={m.id}
              to={m.to}
              style={{ display: showLoggedInMenu }}
              onClick={() => handleMenuOnClick()}
            >
              {m.text}
            </Link>
          );
        })}

        <Link
          to="/shopping"
          style={{ display: showLoggedInMenu }}
          onClick={() => handleMenuOnClick()}
        >
          Shopping
        </Link>
        <Link
          to="/cart"
          style={{ display: showLoggedInMenu }}
          onClick={() => handleMenuOnClick()}
        >
          <i className="material-icons">shopping_cart</i> ({itemCount})
        </Link>

        {menus.menuLeft2.map((m) => {
          return (
            <Link
              key={m.id}
              to={m.to}
              style={{ display: showLoggedInMenu }}
              onClick={() => handleMenuOnClick()}
            >
              {m.text}
            </Link>
          );
        })}

        <User
          showLoggedInMenu={showLoggedInMenu}
          loggedInAs={loggedInAs}
        />

        {menus.menuRight.map((m) => {
          return (
            <Link
              key={m.id}
              to={m.to}
              className="nav-link"
              style={{ display: showLoggedInMenu, marginTop: "6px" }}
              onClick={() => {
                if (m.text === "Sign Out") {
                  signout();
                } else {
                  handleMenuOnClick();
                }
              }}
            >
              {m.text}
            </Link>
          );
        })}
      </div>
    </div>
  );
}

const mapStateToProps = (state, ownProps) => {
  var itemCount = 0;
  if (state.cartReducer && state.cartReducer.addedItems) {
    state.cartReducer.addedItems.map((s) => {
      return (itemCount += s.quantity);
    });
  }

  return {
    itemCount: itemCount,
    props: ownProps,
  };
};

export default connect(mapStateToProps, null)(withRouter(Sidebar));
