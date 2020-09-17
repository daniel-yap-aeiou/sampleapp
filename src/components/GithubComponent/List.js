import React, { useState, useEffect } from "react";
import axios from "axios";
import { Badge } from "react-bootstrap";

import { A } from "../../Theme/styles";

const List = (props) => {
  const { repos } = props;
  let [repoList, setState] = useState({
    data: [],
  });
  let [avatarUrl, setAvatarUrl] = useState("");

  useEffect(() => {
    const loadLanguages = (repo, url) => {
      console.log(url + " called");
      if (!url) return false;

      const apiUrl = `${url}`;
      let langs = [];
      axios
        .get(apiUrl)
        .then((repos) => {
          const languages = repos.data;
          const keys = Object.keys(languages);
          langs = keys;

          let r = repoList.data;
          r.push({ repo, langs });
          setState((prevState) => ({
            ...prevState,
            data: r,
          }));
        })
        .catch((err) => {
          langs = [];
          let r = repoList.data;
          r.push({ repo, langs });
          setState((prevState) => ({
            ...prevState,
            data: r,
          }));
        });
    };

    if (repos) {
      if (repos[0] && repos[0].owner && repos[0].owner.avatar_url) {
        setAvatarUrl(repos[0].owner.avatar_url);
      }

      repos.map((repo) => {
        loadLanguages(repo, repo.languages_url);
      });
    }

    return () => {
      console.log("cleaned up...");
    };
  }, [repos]);

  if (!repos || repos.length === 0)
    return <div className="col-12">No repos, sorry (API limit reached)</div>;

  return (
    <ul>
      <h2 className="list-head">Available Public Repositories</h2>
      {avatarUrl ? (
        <p>
          <img src={avatarUrl} style={{ width: "50px" }} alt="avatar" />
        </p>
      ) : (
        ""
      )}

      {repoList
        ? repoList.data.map((r) => {
            let repo = r.repo;
            let langs = r.langs;

            return (
              <li key={repo.id} className="list github">
                <span className="repo-text">
                  <A
                    href={repo.html_url}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {repo.name}
                  </A>{" "}
                </span>
                <br />
                <span className="repo-description">
                  {repo.description || "No description"}
                </span>
                <br />
                <span style={{ fontWeight: "bold" }}>Star:&nbsp;</span>
                <span>{repo.stargazers_count || 0}</span>
                &nbsp;&nbsp;&nbsp;
                <span style={{ fontWeight: "bold" }}>Fork:&nbsp;</span>
                <span>{repo.forks_count || 0}</span>
                <br />
                {langs && langs.length > 0 ? (
                  langs.map((l) => {
                    return (
                      <span key={l}>
                        <Badge variant="secondary">{l}</Badge>&nbsp;
                      </span>
                    );
                  })
                ) : (
                  <span style={{fontStyle: "italic", fontSize: "11px"}}>NA</span>
                )}
                <br />
                <span className="updatedat" title="updated at">
                  {repo.updated_at}
                </span>
              </li>
            );
          })
        : ""}
    </ul>
  );
};

export default List;
