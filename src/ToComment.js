import React, { useState, useEffect } from "react";
import "./App.css";
import axios from "axios";
import { connect } from "react-redux";
import URLS from "./util/constants";
import actionTypes from "./util/actionTypes";

function ToComment({ comments, dispatch }) {
  let [comment, setComment] = useState("");
  let [commentsCount, setCommentsCount] = useState(comments.length);

  useEffect(() => {
    return () => {
      console.log("cleaned up");
    };
  }, []);

  function handleChange(event) {
    let val = event.target.value;
    setComment(val);
  }

  function handleSubmit(event) {
    if (comment == null || comment == undefined || comment == "") return false;

    let result = comments.map(a => a.id);
    let max = Math.max.apply(null, result);
    //let newId = max + 1;
    let newId = Math.random();
    dispatch({
      type: actionTypes.ADD_COMMENT,
      payload: { id: newId, title: comment }
    });

    setComment("");
    setCommentsCount(comments.length);
  }

  function loadMore() {
    fetch(URLS.POSTS_RANDOM)
      .then(response => response.json())
      .then(json => {
        dispatch({
          type: actionTypes.LOAD_COMMENTS,
          payload: json
        });
      });
  }
  
  function handleDelete(id) {
    dispatch({
      type: actionTypes.DEL_COMMENT,
      payload: { id: id }
    });
  }

  return (
    <div className="container">

      <div className="row">
        <div className="col-lg-6">
          <label>Comment:</label>&nbsp;
          <input type="text" onChange={handleChange} value={comment} />
          &nbsp;
          <button onClick={handleSubmit} className="btn btn-primary">
            Add Comment
          </button>
          &nbsp;
          <button onClick={loadMore} className="btn btn-primary">
            Load More
          </button>
          &nbsp;
          <ul>
            {comments.map(comment => (
              <li key={comment.id}>
                {comment.title}
                &nbsp;
                <button onClick={() => handleDelete(comment.id)}>X</button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

const mapStateToProps = state => {
  return { comments: state.commentReducer.comments };
};

const mapDispatchToProps = dispatch => {
  return {
    dispatch
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ToComment);
