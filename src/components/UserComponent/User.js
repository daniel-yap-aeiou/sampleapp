import React, { useState, useEffect } from "react";
import { withRouter } from "react-router-dom";
import "./User.css";

export function User(props) {
  let { showLoggedInMenu, loggedInAs } = props;
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
      <a
        href="/account"
        className="nav-link"
        style={{ display: showLoggedInMenu }}
        onClick={() => handleLink}
      >
        <span data-letters={initial}></span>
        {loggedInAs}
      </a>
    </li>
  );
}

export default withRouter(User);
