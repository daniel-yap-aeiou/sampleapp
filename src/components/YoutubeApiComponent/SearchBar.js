import React, { useState } from "react";

function Searchbar(props) {
  const [term, setState] = useState("");

  const handleChange = (event) => {
    let t = event.target.value;
    setState((prevState) => (prevState = t));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    props.handleFormSubmit(term);
  };

  return (
    <div className="search-bar ui segment">
      <form className="ui form">
        <div className="field">
          <label htmlFor="video-search">Video Search</label>
          <input
            onChange={handleChange}
            name="video-search"
            type="text"
            value={term}
            className="form-control"
          />
          <br />
          <button className="btn btn-primary" onClick={handleSubmit}>
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}

export default Searchbar;
