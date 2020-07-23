import React, { useState, useEffect } from "react";

import Title from "../HeaderComponent/Title";

import AlertComponent from "../AlertComponent/AlertComponent";
import RegistrationForm from "../RegistrationForm/RegistrationForm";
import LoginForm from "../LoginForm/LoginForm";

import Home from "../HomeComponent/Home";
import ToDo from "../ToDoComponent/ToDo";
import Comment from "../CommentComponent/Comment";
import Chat from "../ChatComponent/Chat";
import Paginate from "../PaginateComponent/Paginate";

import ShoppingIndex from "../ShoppingComponent/Index";
import Cart from "../ShoppingComponent/Cart";
import Account from "../AccountComponent/Account";
import News from "../NewsComponent/NewsHome";
import GithubApi from "../GithubComponent/GithubApi";
import YoutubeApi from "../YoutubeApiComponent/Index";

import { Switch, Route, withRouter } from "react-router-dom";

// The Main component renders one of the three provided
// Routes (provided that one matches). Both the /roster
// and /schedule routes will match any pathname that starts
// with /roster or /schedule. The / route will only match
// when the pathname is exactly the string "/"
function Main(props) {
  let { hideLoader, showLoader } = props;

  const [title, updateTitle] = useState(null);
  const [errorMessage, updateErrorMessage] = useState(null);

  useEffect(() => {
    const user = localStorage.getItem("user");

    if (user == null) {
      props.history.push("/login");
    }
  }, [props.history]);

  const Page404 = ({ location }) => (
    <div>
      <h2>
        No match found for <code>{location.pathname}</code>
      </h2>
    </div>
  );

  /* Set the width of the sidebar to 0 and the left margin of the page content to 0 */
  function closeNav() {
    document.getElementById("mySidebar").style.width = "0";
  }

  return (
    <main>
      <Title title={title} />
      <AlertComponent
        errorMessage={errorMessage}
        hideError={updateErrorMessage}
      />

      <Switch>
        <Route path="/" exact={true}>
          <RegistrationForm
            showError={updateErrorMessage}
            updateTitle={updateTitle}
            hideLoader={hideLoader}
            showLoader={showLoader}
          />
        </Route>
        <Route path="/register">
          <RegistrationForm
            showError={updateErrorMessage}
            updateTitle={updateTitle}
            hideLoader={hideLoader}
            showLoader={showLoader}
          />
        </Route>
        <Route path="/login">
          <LoginForm
            showError={updateErrorMessage}
            updateTitle={updateTitle}
            hideLoader={hideLoader}
            showLoader={showLoader}
          />
        </Route>

        <Route
          path="/home"
          component={() => (
            <Home hideLoader={hideLoader} showLoader={showLoader} />
          )}
        />
        <Route
          path="/todo"
          component={() => (
            <ToDo hideLoader={hideLoader} showLoader={showLoader} />
          )}
        />
        <Route
          path="/comment"
          component={() => (
            <Comment hideLoader={hideLoader} showLoader={showLoader} />
          )}
        />
        <Route
          path="/chat"
          component={() => (
            <Chat hideLoader={hideLoader} showLoader={showLoader} />
          )}
        />
        <Route
          path="/paginate"
          component={() => (
            <Paginate hideLoader={hideLoader} showLoader={showLoader} />
          )}
        />

        <Route
          path="/shopping"
          component={() => (
            <ShoppingIndex hideLoader={hideLoader} showLoader={showLoader} />
          )}
        />
        <Route
          path="/cart"
          component={() => (
            <Cart hideLoader={hideLoader} showLoader={showLoader} />
          )}
        />
        <Route
          path="/account"
          component={() => (
            <Account
              hideLoader={hideLoader}
              showLoader={showLoader}
              closeNav={closeNav}
            />
          )}
        />
        <Route
          path="/news"
          component={() => (
            <News hideLoader={hideLoader} showLoader={showLoader} />
          )}
        />
        <Route
          path="/githubapi"
          component={() => (
            <GithubApi hideLoader={hideLoader} showLoader={showLoader} />
          )}
        />
        <Route
          path="/youtubeapi"
          component={() => (
            <YoutubeApi hideLoader={hideLoader} showLoader={showLoader} />
          )}
        />

        <Route component={Page404} />
      </Switch>
    </main>
  );
}

export default withRouter(Main);
