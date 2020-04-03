import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Logo from "./logo.svg";

function Header() {
  let [navCollapsed, setNavCollapsed] = useState(true);

  function _onToggleNav() {
    setNavCollapsed(!navCollapsed);
  }

  return (
    <header>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
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

        <div className={(navCollapsed ? 'collapse' : '') + ' navbar-collapse'} id="navbarSupportedContent">
          <ul className="navbar-nav mr-auto">
            <li className="nav-item">
              <Link to="/" className="nav-link">
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/ToDo" className="nav-link">
                ToDo
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/ToComment" className="nav-link">
                ToComment
              </Link>
            </li>
          </ul>
        </div>
      </nav>
      <br />
    </header>
  );
}

export default Header;
