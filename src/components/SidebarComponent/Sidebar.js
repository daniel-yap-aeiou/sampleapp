import React, { useState, useEffect } from "react";
import { Link, withRouter, useHistory } from "react-router-dom";
import { connect } from "react-redux";
//import Logo from "../../logo.svg";

import { menus } from "../../constants/menu";
import { User } from "../UserComponent/User";
import "./Sidebar.css";

import { IsUserLoggedIn, GetUserEmailAddress, SignOut } from  "../../contexts/UserContext";
import { showLoader } from "../../contexts/LoaderContext";

function Sidebar({ itemCount }) {
  let history = useHistory();
  let [showLoggedInMenu, updateShowLoggedInMenu] = useState("none");
  let [loggedInAs, updateLoggedInAs] = useState(null);
  
  useEffect(() => {
    if (IsUserLoggedIn() == null) {
      updateShowLoggedInMenu((prevValue) => (prevValue = "none"));
    } else {
      updateShowLoggedInMenu((prevValue) => (prevValue = "block"));
      updateLoggedInAs((prevValue) => (prevValue = GetUserEmailAddress()));
    }
  }, []);

  const signout = () => {
    showLoader();
    SignOut();
    updateShowLoggedInMenu((prevValue) => (prevValue = "none"));
    updateLoggedInAs((prevValue) => (prevValue = null));
    history.push("/login");
    window.location.reload();
    window.location.pathname = "/";
  };

  /* Set the width of the sidebar to 0 and the left margin of the page content to 0 */
  function closeNav() {
    document.getElementById("mySidebar").style.width = "0";
  }

  const handleMenuOnClick = () => {
    closeNav();
    showLoader();
  };

  return (
    <div>
      <div id="mySidebar" className="sidebar">
        <a href="##" className="closebtn" onClick={closeNav}>
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
          closeNav={closeNav}
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
      itemCount += s.quantity;
    });
  }

  return {
    itemCount: itemCount,
    props: ownProps,
  };
};

export default connect(mapStateToProps, null)(withRouter(Sidebar));
