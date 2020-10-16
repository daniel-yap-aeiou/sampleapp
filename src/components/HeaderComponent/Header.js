import React, { useState, useEffect } from "react";
import { Link, withRouter, useHistory } from "react-router-dom";
import { connect } from "react-redux";
import Logo from "../../logo.svg";

import { menus } from "../../constants/menu";
import { User } from "../UserComponent/User";
import { useUserContext } from "../../contexts/UserContext";
import { useUtilContext } from "../../contexts/UtilContext";
import { useThemeContext } from "../../contexts/ThemeContext";

import { NavNew } from "../../Theme/styles";

function Header({ itemCount }) {
  const history = useHistory();

  const userContext = useUserContext();
  const utilContext = useUtilContext();
  const themeContext = useThemeContext();

  const [navCollapsed, setNavCollapsed] = useState(true);
  const [showLoggedInMenu, updateShowLoggedInMenu] = useState("none");
  const [loggedInAs, updateLoggedInAs] = useState(null);
  const [navBarClassName, setNarBarClassName] = useState("");
  const [currentTheme, setCurrentTheme] = useState("");

  function _onToggleNav() {
    setNavCollapsed((prevValue) => (prevValue = !prevValue));
  }

  useEffect(() => {
    if (!userContext.IsUserLoggedIn()) {
      updateShowLoggedInMenu((prevValue) => (prevValue = "none"));
    } else {
      updateShowLoggedInMenu((prevValue) => (prevValue = "block"));
      updateLoggedInAs(
        (prevValue) => (prevValue = userContext.GetUserEmailAddress())
      );
    }

    const theme = themeContext.getTheme();
    setCurrentTheme((pv) => (pv = theme));
    setNavBarClassName(theme);
  }, [userContext.IsUserLoggedIn()]);

  const signout = () => {
    utilContext.showLoader();
    userContext.SignOut();
    updateShowLoggedInMenu((pv) => (pv = "none"));
    updateLoggedInAs((pv) => (pv = null));
    history.push("/login");
    utilContext.closeNav();
  };

  const toggleNavBarMode = (e) => {
    const selectedTheme = e.target.value;

    themeContext.toggleTheme(selectedTheme);
    setCurrentTheme((pv) => (pv = selectedTheme));
    setNavBarClassName(selectedTheme);
  };

  const setNavBarClassName = (theme) => {
    if (theme === "dark" || theme === "pink" || theme === "purple" || theme === "black") {
      setNarBarClassName((pv) => (pv = "navbar-dark bg-dark fixed-top"));
    } else {
      setNarBarClassName((pv) => (pv = "navbar-light bg-light fixed-top"));
    }
  };

  const handleMenuOnClick = () => {
    utilContext.closeNav();
    utilContext.showLoader();
  };

  return (
    <header>
      <NavNew className={navBarClassName + " navbar navbar-expand-lg fixed-top"}>
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
                onClick={utilContext.openNav}
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
                    onClick={() => handleMenuOnClick()}
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
                      onClick={() => handleMenuOnClick()}
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
                      onClick={() => handleMenuOnClick()}
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
                onClick={() => handleMenuOnClick()}
              >
                Shopping
              </Link>
            </li>
            <li className="nav-item">
              <Link
                to="/cart"
                className="nav-link"
                style={{ display: showLoggedInMenu }}
                onClick={() => handleMenuOnClick()}
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
                    onClick={() => handleMenuOnClick()}
                  >
                    {m.text}
                  </Link>
                </li>
              );
            })}
          </ul>

          <ul className="nav navbar-nav navbar-right">
            <li className="nav-item">
              <select
                className="select-css"
                value={currentTheme}
                onChange={toggleNavBarMode}
                style={{marginTop: 8}}
              >
                <option value="light">Light Saber</option>
                <option value="dark">Dark Chocolate</option>
                <option value="pink">Pinky Promise</option>
                <option value="purple">Purple Rain</option>
                <option value="black">Black Label</option>
              </select>
            </li>

            <User showLoggedInMenu={showLoggedInMenu} loggedInAs={loggedInAs} sidebar={false} />

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
                        utilContext.showLoader();
                      }
                    }}
                  >
                    {m.text}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      </NavNew>
      <br />
    </header>
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

export default connect(mapStateToProps, null)(withRouter(Header));

//export default withRouter(Header);
