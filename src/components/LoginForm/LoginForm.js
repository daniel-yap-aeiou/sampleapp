import React, { useState, useEffect } from "react";
import "./LoginForm.css";
import { withRouter, useHistory } from "react-router-dom";
import { useUserContext } from "../../contexts/UserContext";
import { useUtilContext } from "../../contexts/UtilContext";
import { useAlertContext } from "../../contexts/AlertContext";
import { Card, Small } from "../../Theme/styles";

function LoginForm() {
  const userContext = useUserContext();
  const utilContext = useUtilContext();
  const alertContext = useAlertContext();
  const history = useHistory();
  const [state, setState] = useState({
    email: "",
    password: "",
    successMessage: null,
  });
  const handleChange = (e) => {
    const { id, value } = e.target;
    setState((prevState) => ({
      ...prevState,
      [id]: value,
    }));
  };

  const handleSubmitClick = (e) => {
    e.preventDefault();

    if (state.email === "") {
      alertContext.setAlert("Email is required");
      return false;
    }

    if (state.password === "") {
      alertContext.setAlert("Password is required");
      return false;
    }

    alertContext.setAlert(null);
    utilContext.showLoader();

    const payload = {
      email: state.email,
      password: state.password,
    };

    setState((prevState) => ({
      ...prevState,
      successMessage: "Login successful. Redirecting to home page..",
    }));

    setTimeout(() => {
      userContext.SignIn(payload);
      redirectToHome();
    }, 2000);
  };

  const redirectToHome = () => {
    alertContext.setAlert(null);
    history.push("/home");
  };

  const redirectToRegister = () => {
    alertContext.setAlert(null);
    history.push("/register");
  };

  useEffect(utilContext.hideLoader, []);

  return (
    <Card className="card col-12 col-lg-4 login-card mt-2 hv-center">
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
          <Small id="emailHelp" className="form-text text-muted">
            We'll never share your email with anyone else.
          </Small>
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
        <div className="form-check"></div>
        <button
          type="submit"
          className="btn btn-primary"
          onClick={handleSubmitClick}
        >
          Submit
        </button>
      </form>
      <div
        className="alert alert-success mt-2"
        style={{ display: state.successMessage ? "block" : "none" }}
        role="alert"
      >
        {state.successMessage}
      </div>
      <div className="registerMessage">
        <span>Dont have an account? </span>
        <span className="loginText" onClick={() => redirectToRegister()}>
          Register
        </span>
      </div>
    </Card>
  );
}

export default withRouter(LoginForm);
