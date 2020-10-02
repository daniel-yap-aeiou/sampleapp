import React, { useEffect, useState } from "react";
import axios from "axios";
import "./GithubApi.css";
import List from "./List";
import withListLoading from "./WithListLoading";
import { useUtilContext } from "../../contexts/UtilContext";

function GithubApi(props) {
  const utilContext = useUtilContext();
  const ListLoading = withListLoading(List);
  const [appState, setAppState] = useState({
    loading: false,
    repos: null,
  });
  let [username, setUsername] = useState("daniel-yap-aeiou");

  useEffect(() => {
    setAppState({ loading: true });
    const apiUrl = `https://api.github.com/users/${username}/repos`;
    axios
      .get(apiUrl)
      .then((repos) => {
        const allRepos = repos.data;
        setAppState({ loading: false, repos: allRepos });
      })
      .catch((err) => {
        setAppState({ loading: false, repos: [] });
      });
  }, [setAppState, username]);

  useEffect(utilContext.hideLoader, []);

  const handleUsernameChange = (e) => {
    let username = e.target.value;
    setUsername((prevValue) => (prevValue = username));
  };

  return (
    <div>
      <div className="container">
        <h1>My Repositories</h1>
        <input
          type="text"
          value={username}
          onChange={handleUsernameChange}
          className="form-control"
        />
      </div>
      <div className="repo-container">
        <ListLoading isLoading={appState.loading} repos={appState.repos} />
      </div>
    </div>
  );
}

export default GithubApi;
