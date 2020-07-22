import React, { useState, useEffect } from "react";
import { withRouter } from "react-router-dom";
import ReactPaginate from "react-paginate";
import axios from "axios";
import "./Paginate.css";
import Data from "./Data";

function Paginate(props) {
  const [state, setState] = useState({
    offset: 0,
    data: [],
    perPage: 5,
    currentPage: 0,
    pageCount: 0,
  });

  const handlePageClick = (e) => {
    const selectedPage = e.selected;
    const offset = selectedPage * state.perPage;

    setState((prevState) => ({
      ...prevState,

      currentPage: selectedPage,
      offset: offset,
    }));
  };

  useEffect(() => {
    const receivedData = () => {
      props.showLoader();
      axios.get(`https://jsonplaceholder.typicode.com/photos`).then((res) => {
        const data = res.data;
        const slice = data.slice(state.offset, state.offset + state.perPage);
        const postData = slice.map((pd) => pd);

        setState((prevState) => ({
          ...prevState,
          pageCount: Math.ceil(data.length / state.perPage),
          data: postData,
        }));
        props.hideLoader();
      });
    };

    props.hideLoader();
    receivedData();

    return () => {
      props.hideLoader();
      console.log("cleaned up");
    };
  }, [props, state.currentPage, state.offset, state.perPage]);

  return (
    <div className="col-12">
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
      />
      <Data data={state.data} />

      <div style={{ marginTop: "30px", marginBottom: "30px" }}>
        Reference:&nbsp;
        <a
          href="https://www.npmjs.com/package/react-paginate"
          target="_blank"
          rel="noopener noreferrer"
        >
          Paginate
        </a>
      </div>
    </div>
  );
}

export default withRouter(Paginate);
