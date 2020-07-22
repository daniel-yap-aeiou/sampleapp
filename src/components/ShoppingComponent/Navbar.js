import React from "react";
import { Link } from "react-router-dom";
const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container">
        <Link to="/Shopping" className="navbar-brand">
          Shopping
        </Link>

        <ul className="nav navbar-nav navbar-right">
          <li className="nav-item" >
            <Link to="/Shopping" className="nav-link">Shop</Link>
          </li>
          <li className="nav-item" > 
            <Link to="/cart" className="nav-link">My cart</Link>
          </li>
          <li className="nav-item" >
            <Link to="/cart" className="nav-link">
              <i className="material-icons">shopping_cart</i>
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
