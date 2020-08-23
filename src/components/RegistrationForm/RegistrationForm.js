import React, { useState, useEffect } from "react";
import "./RegistrationForm.css";
import { withRouter } from "react-router-dom";

import { useUserContext } from "../../contexts/UserContext";
import { useUtilContext } from "../../contexts/UtilContext";

function RegistrationForm(props) {
  const userContext = useUserContext();
  const utilContext = useUtilContext();
  const [state, setState] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    successMessage: null,
  });
  const handleChange = (e) => {
    const { id, value } = e.target;
    setState((prevState) => ({
      ...prevState,
      [id]: value,
    }));
  };
  const sendDetailsToServer = () => {
    if (state.email.length && state.password.length) {
      utilContext.showLoader();
      props.showError(null);

      const payload = {
        email: state.email,
        password: state.password,
      };

      setState((prevState) => ({
        ...prevState,
        successMessage: "Registration successful. Redirecting to home page..",
      }));

      setTimeout(() => {
        userContext.SignIn(payload);
        redirectToHome();
      }, 2000);

    } else {
      props.showError("Please enter valid username and password");
    }
  };

  const redirectToHome = () => {
    utilContext.showLoader();
    props.history.push("/home");
  };

  const redirectToLogin = () => {
    utilContext.showLoader();
    props.history.push("/login");
  };

  const handleSubmitClick = (e) => {
    e.preventDefault();
    if (state.password === state.confirmPassword) {
      sendDetailsToServer();
    } else {

      setState((prevState) => ({
        ...prevState,
        successMessage: "",
      }));

      props.showError("Passwords do not match");
    }
  };

  useEffect(() => {
    if (userContext.IsUserLoggedIn()) {
      redirectToHome();
    }
    utilContext.hideLoader();
  });

  return (
    <div className="card col-12 col-lg-4 login-card mt-2 hv-center">
      <form>
        <div className="form-group text-left">
          <label htmlFor="exampleInputEmail1">Email address</label>
          <input
            type="email"
            className="form-control"
            id="email"
            aria-describedby="emailHelp"
            placeholder="Enter email"
            value={state.email}
            onChange={handleChange}
          />
          <small id="emailHelp" className="form-text text-muted">
            We'll never share your email with anyone else.
          </small>
        </div>
        <div className="form-group text-left">
          <label htmlFor="exampleInputPassword1">Password</label>
          <input
            type="password"
            className="form-control"
            id="password"
            placeholder="Password"
            value={state.password}
            onChange={handleChange}
          />
        </div>
        <div className="form-group text-left">
          <label htmlFor="exampleInputPassword1">Confirm Password</label>
          <input
            type="password"
            className="form-control"
            id="confirmPassword"
            placeholder="Confirm Password"
            value={state.confirmPassword}
            onChange={handleChange}
          />
        </div>
        <button
          type="submit"
          className="btn btn-primary"
          onClick={handleSubmitClick}
        >
          Register
        </button>
      </form>
      <div
        className="alert alert-success mt-2"
        style={{ display: state.successMessage ? "block" : "none" }}
        role="alert"
      >
        {state.successMessage}
      </div>
      <div className="mt-2">
        <span>Already have an account? </span>
        <span className="loginText" onClick={() => redirectToLogin()}>
          Login here
        </span>
      </div>
    </div>
  );
}

export default withRouter(RegistrationForm);
