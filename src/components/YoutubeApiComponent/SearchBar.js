import React, { useState, useEffect } from "react";

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

  const clearSelectedVideo = (event) => {
    event.preventDefault();
    props.clearSelectedVideo();
  };

  useEffect(() => {
    setState((prevState) => (prevState = "ABC"));
    setTimeout(() => {
      document.getElementById("searchSubmitButton").click();
    }, 200);
  }, []);

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
          <button
            id="searchSubmitButton"
            className="btn btn-primary"
            onClick={handleSubmit}
          >
            Submit
          </button>&nbsp;
          <button type="button" className="btn btn-danger" onClick={clearSelectedVideo}>
            Clear
          </button>
        </div>
      </form>
    </div>
  );
}

export default Searchbar;
