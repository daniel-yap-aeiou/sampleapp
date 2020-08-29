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

import { UserProvider } from "./contexts/UserContext";
import { UtilProvider } from "./contexts/UtilContext";
import { TitleProvider } from "./contexts/TitleContext";
import { AlertProvider } from "./contexts/AlertContext";
import { AppThemeProvider } from "./contexts/ThemeContext";

window.store = store;

// Create your browser history
const history = createHashHistory();

history.listen((location) => {
  // const userContext = useUserContext();
  // if (userContext.IsUserLoggedIn() && window.location.hostname === "localhost") {
  //   window.location.pathname = "/" + userContext.GetUserEmailAddress();
  // }
});

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <Router
        basename="sampleapp"
        //getUserConfirmation={handlePageChange}
        history={history}
      >
        <AppThemeProvider>
          <AlertProvider>
            <UserProvider>
              <TitleProvider>
                <UtilProvider>
                  <App />
                </UtilProvider>
              </TitleProvider>
            </UserProvider>
          </AlertProvider>
        </AppThemeProvider>
      </Router>
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
