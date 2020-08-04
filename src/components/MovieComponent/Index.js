import React, { useState, useEffect } from "react";
import { Spinner } from "react-bootstrap";
import KEY from "./key";
import { withRouter } from "react-router-dom";
import { Badge } from "react-bootstrap";
import ReactPaginate from "react-paginate";
import axios from "axios";
import List from "./List";
import "./Index.css";
import Category from "./Category";

function Index(props) {
  const [movie, setMovie] = useState("");
  const [msg, setMsg] = useState("");
  const [spinnerClassName, setSpinnerClassName] = useState("hide");
  const [term, setTerm] = useState("");

  const [genres, setGenres] = useState([]);
  const [state, setState] = useState({
    offset: 0,
    data: [],
    perPage: 20,
    currentPage: 0,
    pageCount: 0,
  });

  const handlePageClick = (e) => {
    const selectedPage = e.selected;
    const offset = selectedPage * state.perPage;
    
    setState((prevState) => ({
      ...prevState,
      currentPage: selectedPage + 1,
      offset: offset,
    }));
  };

  const handleInputChange = (e) => {
    setSpinnerClassName((pv) => (pv = ""));
    const v = e.target.value;
    setMovie((prevValue) => (prevValue = v));

    setTerm((prevValue) => (prevValue = ""));
    setState((prevState) => ({
      ...prevState,
      offset: 0,
      data: [],
      perPage: 20,
      currentPage: 0,
      pageCount: 0,
    }));

    const movieBadges = document.querySelectorAll(".movie-category");
    const array = [...movieBadges];
    array.map((b) => {
      b.className = "badge-pill badge-secondary movie-category";
    });

    setTimeout(() => {
      setSpinnerClassName((pv) => (pv = "hide"));
    }, 1000);
  };

  const handleOnSubmitViaClick = () => {
    if (movie === undefined || movie === "") return false;
  };

  const handleBadgeViaClick = (e, t) => {
    if (t === undefined || t === "") return false;

    setMovie((prevValue) => (prevValue = ""));
    setTerm((prevValue) => (prevValue = t));
    setState((prevState) => ({
      ...prevState,
      offset: 0,
      data: [],
      perPage: 20,
      currentPage: 0,
      pageCount: 0,
    }));

    const movieBadges = document.querySelectorAll(".movie-category");
    const array = [...movieBadges];
    array.map((b) => {
      b.className = "badge-pill badge-secondary movie-category";
    });

    e.target.setAttribute(
      "class",
      "selected badge-pill badge-secondary movie-category"
    );
  };

  useEffect(() => {
    const receivedData = () => {
      if (state.currentPage === 0) {
        setState((prevState) => ({
          ...prevState,
          currentPage: 1,
        }));

        return false;
      }

      if (term === undefined || term === null || term === "") {
        return false;
      }

      props.showLoader();
      const url = `https://api.themoviedb.org/3/movie/${term}?api_key=${KEY}&language=en-US&page=${state.currentPage}`;

      axios
        .get(url)
        .then((res) => {
          const data = res.data;

          setState((prevState) => ({
            ...prevState,
            pageCount: data.total_pages,
            data: data.results,
          }));
          props.hideLoader();
        })
        .catch((err) => {
          console.log(err);
          props.hideLoader();
        });
    };

    props.hideLoader();
    receivedData();

    return () => {
      props.hideLoader();
      console.log("cleaned up");
    };
  }, [props, state.currentPage, state.offset, state.perPage, term]);

  useEffect(() => {
    const receivedData = () => {
      if (movie === undefined || movie === null || movie === "") {
        return false;
      }
      
      props.showLoader();
      const url = `https://api.themoviedb.org/3/search/movie/?api_key=${KEY}&query=${movie}`;

      axios
        .get(url)
        .then((res) => {
          const data = res.data;

          setState((prevState) => ({
            ...prevState,
            pageCount: data.total_pages,
            data: data.results,
          }));
          props.hideLoader();
        })
        .catch((err) => {
          console.log(err);
          props.hideLoader();
        });
    };

    props.hideLoader();
    receivedData();

    return () => {
      props.hideLoader();
      console.log("cleaned up");
    };
  }, [movie, props]);

  useEffect(props.hideLoader, []);

  useEffect(() => {
    props.showLoader();
    const url = `https://api.themoviedb.org/3/genre/movie/list?api_key=${KEY}&language=en-US}`;

    axios
      .get(url)
      .then((res) => {
        const data = res.data;

        setGenres((prevState) => (prevState = data.genres));
        props.hideLoader();
      })
      .catch((err) => {
        console.log(err);
        props.hideLoader();
      });
  }, []);

  return (
    <div className="container">
      <div className="row">
        <div className="col-lg-12">
          <form className="">
            <input
              type="text"
              placeholder="Search for a movie"
              className="form-control"
              value={movie}
              onChange={handleInputChange}
            />
            <br />
            <button
              id="movieSubmitButton"
              type="button"
              className="btn btn-primary"
              onClick={handleOnSubmitViaClick}
            >
              Submit
            </button>
            <Spinner animation="border" className={spinnerClassName} />
            &nbsp;<span className="msg">{msg}</span>
          </form>

          <br />
          <div className="col-lg-12 navigation clearfix">
            {Category
              ? Category.map((c) => {
                  return (
                    <Badge
                      onClick={(e) => {
                        handleBadgeViaClick(e, c.term);
                      }}
                      className="badge-pill badge-secondary movie-category"
                      key={c.id}
                    >
                      {c.label}
                    </Badge>
                  );
                })
              : ""}
          </div>

          <section className="ajax-section">
            <div className="container">
              <div className="cities row"></div>
            </div>
          </section>

          <ReactPaginate
            previousLabel={"prev"}
            nextLabel={"next"}
            breakLabel={"..."}
            breakClassName={"break-me"}
            pageCount={state.pageCount}
            marginPagesDisplayed={2}
            pageRangeDisplayed={5}
            onPageChange={handlePageClick}
            containerClassName={"pagination"}
            subContainerClassName={"pages pagination"}
            activeClassName={"active"}
            forcePage={state.currentPage - 1}
          />

          <List data={state.data} genres={genres} />
        </div>
      </div>
    </div>
  );
}

export default withRouter(Index);
