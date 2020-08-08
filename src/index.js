import React from "react";
import ReactDOM from "react-dom";

import { HashRouter as Router } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store/index";

import "bootstrap/dist/css/bootstrap.css";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import { createHashHistory } from "history";

window.store = store;

const loader = document.querySelector(".loader-main");

// if you want to show the loader when React loads data again
const showLoader = () => loader.classList.remove("loader--hide");
const hideLoader = () => loader.classList.add("loader--hide");
const handlePageChange = () => {};

// Create your browser history
const history = createHashHistory({ handlePageChange });

history.listen((location) => {
  const user = localStorage.getItem("user");

  if (user && window.location.hostname === "localhost") {
    const t = JSON.parse(user);
    window.location.pathname = "/" + t.email;
  }
});

ReactDOM.render(
  // <React.StrictMode>
  //   <App />
  // </React.StrictMode>,
  <Provider store={store}>
    <Router
      basename="sampleapp"
      //getUserConfirmation={handlePageChange}
      history={history}
    >
      <App hideLoader={hideLoader} showLoader={showLoader} />
    </Router>
  </Provider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
