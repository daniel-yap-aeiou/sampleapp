import React, { useEffect } from "react";

import Title from "../HeaderComponent/Title";

import AlertComponent from "../AlertComponent/AlertComponent";
import RegistrationForm from "../RegistrationForm/RegistrationForm";
import LoginForm from "../LoginForm/LoginForm";

import Home from "../HomeComponent/Home";
import User from "../User1Component/User";
import Comment from "../CommentComponent/Comment";
import Chat from "../ChatComponent/Chat";
import Paginate from "../PaginateComponent/Paginate";

import ShoppingIndex from "../ShoppingComponent/Home";
import Cart from "../ShoppingComponent/Cart";
import Account from "../AccountComponent/Account";
import News from "../NewsComponent/NewsHome";
import GithubApi from "../GithubComponent/GithubApi";
import GithubJobsApi from "../GithubJobsApiComponent/Index";
import YoutubeApi from "../YoutubeApiComponent/Index";
import RedditClientApi from "../RedditClientComponent/Index";
import WeatherApi from "../WeatherComponent/Index";
import MovieApi from "../MovieComponent/Index";
import SportsDbApi from "../SportsDbApiComponent/Index";

import Covid19 from "../Covid19Component/Index";

import { Switch, Route, withRouter, useHistory, useLocation  } from "react-router-dom";

import { useUserContext } from "../../contexts/UserContext";

// The Main component renders one of the three provided
// Routes (provided that one matches). Both the /roster
// and /schedule routes will match any pathname that starts
// with /roster or /schedule. The / route will only match
// when the pathname is exactly the string "/"
function Main() {
  const userContext = useUserContext();
  const history = useHistory();
  const location = useLocation();

  useEffect(() => {
    const interval = setInterval(() => {
      if (!userContext.IsUserLoggedIn()) {
        userContext.SignOut();
        if (history.location.pathname.indexOf("login") === -1 && history.location.pathname.indexOf("register") === -1)
        {
          history.push("/login");
          _clearInterval();
        }
      }
    }, 1);
  
    const _clearInterval = function () {
      clearInterval(interval);
    };

  }, [location.pathname]);

  const Page404 = ({ location }) => (
    <div>
      <h2>
        No match found for <code>{location.pathname}</code>
      </h2>
    </div>
  );

  return (
    <main>
      <Title />
      <AlertComponent />

      <Switch>
        <Route path="/" exact={true}>
          <RegistrationForm />
        </Route>
        <Route path="/register">
          <RegistrationForm />
        </Route>
        <Route path="/login">
          <LoginForm />
        </Route>

        <Route path="/home" component={() => <Home />} />
        <Route path="/user" component={() => <User />} />
        <Route path="/comment" component={() => <Comment />} />
        <Route path="/chat" component={() => <Chat />} />
        <Route path="/paginate" component={() => <Paginate />} />
        <Route path="/covid19" component={() => <Covid19 />} />

        <Route path="/shopping" component={() => <ShoppingIndex />} />
        <Route path="/cart" component={() => <Cart />} />
        <Route path="/account" component={() => <Account />} />
        <Route path="/news" component={() => <News />} />
        <Route path="/githubapi" component={() => <GithubApi />} />
        <Route path="/githubjobsapi" component={() => <GithubJobsApi />} />
        <Route path="/youtubeapi" component={() => <YoutubeApi />} />
        <Route path="/redditclientapi" component={() => <RedditClientApi />} />
        <Route path="/weatherapi" component={() => <WeatherApi />} />
        <Route path="/movieapi" component={() => <MovieApi />} />
        <Route path="/sportsdbapi" component={() => <SportsDbApi />} />

        <Route component={Page404} />
      </Switch>
    </main>
  );
}

export default withRouter(Main);
