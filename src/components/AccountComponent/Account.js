import React, { useState, useEffect } from "react";
import { withRouter } from "react-router-dom";
import "./Account.css";
import Logo from "../../logo.svg";

import { useUserContext } from "../../contexts/UserContext";
import { useUtilContext } from "../../contexts/UtilContext";

function Account() {
  const userContext = useUserContext();
  const utilContext = useUtilContext();
  const [loggedInAs, updateLoggedInAs] = useState(null);

  useEffect(() => {
    if (userContext.IsUserLoggedIn()) {
      updateLoggedInAs(userContext.GetUserEmailAddress());
    }
  }, [userContext]);

  useEffect(() => {
    utilContext.hideLoader();
    utilContext.closeNav();
  }, []);

  return (
    <div className="card">
      <img src={Logo} alt="John" />
      <h5>{loggedInAs}</h5>
      <p className="title">CEO & Founder, Example</p>
      <p>RMIT University</p>
      <div>
        <a href="##" className="account-fa">
          <i className="fa fa-dribbble"></i>
        </a>
        <a href="##" className="account-fa">
          <i className="fa fa-twitter"></i>
        </a>
        <a href="##" className="account-fa">
          <i className="fa fa-linkedin"></i>
        </a>
        <a href="##" className="account-fa">
          <i className="fa fa-facebook"></i>
        </a>
      </div>
      <p className="contact-btn-container">
        <button className="account">Contact</button>
      </p>
    </div>
  );
}

export default withRouter(Account);
