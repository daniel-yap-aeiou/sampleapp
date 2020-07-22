import React from "react";

const List = (props) => {
  const { repos } = props;
  if (!repos || repos.length === 0) return <div className="col-12">No repos, sorry</div>;
  return (
    <ul>
      <h2 className="list-head">Available Public Repositories</h2>
      <p>
        <img src={repos[0].owner.avatar_url} style={{ width: "50px" }} alt="avatar" />
      </p>
      {repos.map((repo) => {
        return (
          <li key={repo.id} className="list">
            <span className="repo-text"><a href={repo.html_url} target="_blank" rel="noopener noreferrer">{repo.name}</a> </span>
            <br />
            <span className="repo-description">
              {repo.description || "No description"}
            </span>
            <br />
            <span className="updatedat" title="updated at">{repo.updated_at}</span>
          </li>
        );
      })}
    </ul>
  );
};

export default List;
