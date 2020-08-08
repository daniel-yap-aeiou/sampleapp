import React, { useState, useEffect } from "react";
import { Link, withRouter, useHistory } from "react-router-dom";
import { connect } from "react-redux";
import Logo from "../../logo.svg";

import { menus } from "../../constants/menu";
import { User } from "../UserComponent/User";

function Header({ itemCount, props }) {
  let history = useHistory();

  let [navCollapsed, setNavCollapsed] = useState(true);
  let [showLoggedInMenu, updateShowLoggedInMenu] = useState("none");
  let [loggedInAs, updateLoggedInAs] = useState(null);
  let [navBarClassName, setNarBarClassName] = useState("navbar-light bg-light");

  function _onToggleNav() {
    setNavCollapsed((prevValue) => (prevValue = !prevValue));
  }

  useEffect(() => {
    let user = localStorage.getItem("user");
    let userDetails = JSON.parse(user);

    if (user == null) {
      updateShowLoggedInMenu((prevValue) => (prevValue = "none"));
    } else {
      updateShowLoggedInMenu((prevValue) => (prevValue = "block"));
      updateLoggedInAs((prevValue) => (prevValue = userDetails.email));
    }
  }, []);

  const signout = () => {
    props.showLoader();
    localStorage.removeItem("user");
    updateShowLoggedInMenu((prevValue) => (prevValue = "none"));
    updateLoggedInAs((prevValue) => (prevValue = null));
    history.push("/login");
    window.location.reload();
    window.location.pathname = "/";
    //props.updateTitle("Login");
  };

  const toggleNavBarMode = () => {
    if (navBarClassName.includes("light")) {
      setNarBarClassName((prevValue) => (prevValue = "navbar-dark bg-dark"));
    } else {
      setNarBarClassName((prevValue) => (prevValue = "navbar-light bg-light"));
    }
  };

  /* Set the width of the sidebar to 250px and the left margin of the page content to 250px */
  function openNav() {
    document.getElementById("mySidebar").style.width = "250px";
  }

  /* Set the width of the sidebar to 0 and the left margin of the page content to 0 */
  function closeNav() {
    document.getElementById("mySidebar").style.width = "0";
  }

  return (
    <header>
      <nav className={navBarClassName + " navbar navbar-expand-lg"}>
        <Link to="/" className="navbar-brand">
          <img src={Logo} className="App-logo" alt="App" /> &nbsp;
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
          onClick={_onToggleNav}
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div
          className={(navCollapsed ? "collapse" : "") + " navbar-collapse"}
          id="navbarSupportedContent"
        >
          <ul className="navbar-nav mr-auto">
            <li className="nav-item" title="sidebar">
              <button
                className="btn btn-sm"
                onClick={openNav}
                style={{ display: showLoggedInMenu }}
              >
                <i className="fa fa-bars fa-2x" aria-hidden="true"></i>
              </button>
            </li>

            {menus.menuLeft1.map((m) => {
              return (
                <li className="nav-item" key={m.id}>
                  <Link
                    to={m.to}
                    className="nav-link"
                    style={{ display: showLoggedInMenu }}
                    onClick={() => props.showLoader}
                  >
                    {m.text}
                  </Link>
                </li>
              );
            })}

            <li className="nav-item dropdown">
              <a
                className="nav-link dropdown-toggle"
                href="#"
                id="navbarDropdown1"
                role="button"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
                style={{ display: showLoggedInMenu }}
              >
                Random
              </a>
              <div className="dropdown-menu" aria-labelledby="navbarDropdown1">
                {menus.menuLeftDropdown1.map((m) => {
                  return (
                    <Link
                      key={m.id}
                      to={m.to}
                      className="dropdown-item"
                      style={{ display: showLoggedInMenu }}
                      onClick={() => props.showLoader}
                    >
                      {m.text}
                    </Link>
                  );
                })}
              </div>
            </li>

            <li className="nav-item dropdown">
              <a
                className="nav-link dropdown-toggle"
                href="#"
                id="navbarDropdown2"
                role="button"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
                style={{ display: showLoggedInMenu }}
              >
                Api
              </a>
              <div className="dropdown-menu" aria-labelledby="navbarDropdown2">
                {menus.menuLeftDropdown2.map((m) => {
                  return (
                    <Link
                      key={m.id}
                      to={m.to}
                      className="dropdown-item"
                      style={{ display: showLoggedInMenu }}
                      onClick={() => props.showLoader}
                    >
                      {m.text}
                    </Link>
                  );
                })}
              </div>
            </li>

            <li className="nav-item">
              <Link
                to="/shopping"
                className="nav-link"
                style={{ display: showLoggedInMenu }}
                onClick={() => props.showLoader}
              >
                Shopping
              </Link>
            </li>
            <li className="nav-item">
              <Link
                to="/cart"
                className="nav-link"
                style={{ display: showLoggedInMenu }}
                onClick={() => props.showLoader}
              >
                <i className="material-icons">shopping_cart</i> ({itemCount})
              </Link>
            </li>

            {menus.menuLeft2.map((m) => {
              return (
                <li className="nav-item" key={m.id}>
                  <Link
                    to={m.to}
                    className="nav-link"
                    style={{ display: showLoggedInMenu }}
                    onClick={() => props.showLoader}
                  >
                    {m.text}
                  </Link>
                </li>
              );
            })}
          </ul>

          <ul className="nav navbar-nav navbar-right">
            <User
              showLoggedInMenu={showLoggedInMenu}
              loggedInAs={loggedInAs}
              hideLoader={props.hideLoader}
              showLoader={props.showLoader}
              closeNav={closeNav}
            />

            {menus.menuRight.map((m) => {
              return (
                <li className="nav-item" key={m.id}>
                  <Link
                    to={m.to}
                    className="nav-link"
                    style={{ display: showLoggedInMenu, marginTop: "6px" }}
                    onClick={() => {
                      if (m.text === "Sign Out") {
                        signout();
                      } else {
                        props.showLoader();
                      }
                    }}
                  >
                    {m.text}
                  </Link>
                </li>
              );
            })}

            <li className="nav-item">
              <button
                className="btn btn-warning btn-sm"
                onClick={toggleNavBarMode}
              >
                Toggle
              </button>
            </li>
          </ul>
        </div>
      </nav>
      <br />
    </header>
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

export default connect(mapStateToProps, null)(withRouter(Header));

//export default withRouter(Header);
