import React, { useState, useEffect } from "react";
import { Link, withRouter } from "react-router-dom";
import "./User.css";
import { LinkNew } from "../../Theme/styles";

export function User(props) {
  let { showLoggedInMenu, loggedInAs, sidebar } = props;
  let [initial, updateInitial] = useState(null);

  const handleLink = (e) => {
    e.preventDefault();
    return false;
  };

  useEffect(() => {
    if (loggedInAs != null) {
      updateInitial(loggedInAs.charAt(0).toUpperCase());
    }
  }, [loggedInAs]);

  return (
    <li className="nav-item">
      {sidebar ? (
        <LinkNew
          to="/account"
          className="nav-link"
          style={{ display: showLoggedInMenu }}
          onClick={() => handleLink}
        >
          <span data-letters={initial}></span>
          {loggedInAs}
        </LinkNew>
      ) : (
        <Link
          to="/account"
          className="nav-link"
          style={{ display: showLoggedInMenu }}
          onClick={() => handleLink}
        >
          <span data-letters={initial}></span>
          {loggedInAs}
        </Link>
      )}
    </li>
  );
}

export default withRouter(User);
