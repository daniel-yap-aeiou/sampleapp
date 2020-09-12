import React, { useState, useEffect } from "react";

function Searchbar(props) {
  const [term, setState] = useState("");
  const [maxResults, setMaxResults] = useState(15);

  const handleChange = (event) => {
    let t = event.target.value;
    setState((prevState) => (prevState = t));
  };

  const handleResultCountChange = (event) => {
    let t = event.target.value;
    setMaxResults((prevState) => (prevState = parseInt(t)));
    props.handleSetMaxResults(parseInt(t));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    props.handleFormSubmit(term, maxResults);
  };

  const clearSelectedVideo = (event) => {
    event.preventDefault();
    props.clearSelectedVideo();
  };

  useEffect(() => {
    setState((prevState) => (prevState = "ABC"));
    setTimeout(() => {
      if (document.getElementById("searchSubmitButton"))
      {
        document.getElementById("searchSubmitButton").click();
      }
    }, 200);
  }, []);

  return (
    <div className="search-bar ui segment">
      <form>
        <div className="row">
          <div className="col-lg-5">
            <label htmlFor="video-search">Video Search</label>
            <input
              onChange={handleChange}
              name="video-search"
              type="text"
              value={term}
              className="form-control"
            />
          </div>

          <div className="col-lg-5">
            <label htmlFor="video-search">Result Count</label>
            <select onChange={handleResultCountChange} className="form-control">
              <option value="15">15</option>
              <option value="30">30</option>
              <option value="50">50</option>
            </select>
          </div>
        </div>
        <br />
        <div className="row">
          <div className="col-lg-5">
            <button
              id="searchSubmitButton"
              className="btn btn-primary"
              onClick={handleSubmit}
            >
              Submit
            </button>
            &nbsp;
            <button
              type="button"
              className="btn btn-danger"
              onClick={clearSelectedVideo}
            >
              Clear
            </button>{" "}
          </div>
        </div>
      </form>
    </div>
  );
}

export default Searchbar;
