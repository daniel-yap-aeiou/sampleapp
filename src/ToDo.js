import React, { useState, useEffect } from "react";
import "./App.css";
import axios from "axios";
import { connect } from "react-redux";
import URLS from "./util/constants";

function ToDo({ posts, dispatch }) {
  let [post, setPost] = useState("");
  let [postsCount, setPostsCount] = useState(posts.length);

  useEffect(() => {
    return () => {
      console.log("cleaned up");
    };
  }, []);

  function handleChange(event) {
    let val = event.target.value;
    setPost(val);
  }

  function handleSubmit(event) {
    if (post == null || post == undefined || post == "") return false;

    let result = posts.map(a => a.id);
    let max = Math.max.apply(null, result);
    let newId = max + 1;
    dispatch({
      type: "ADD_POST",
      payload: { id: newId, title: post }
    });

    setPost("");
    setPostsCount(posts.length);
  }

  function loadMore() {
    fetch(URLS.POSTS_RANDOM)
      .then(response => response.json())
      .then(json => {
        dispatch({
          type: "LOAD_POSTS",
          payload: json
        });
      });
  }

  return (
    <div className="container">

      <div className="row">
        <div className="col-lg-6">
          <label>Post:</label>&nbsp;
          <input type="text" onChange={handleChange} value={post} />
          &nbsp;
          <button onClick={handleSubmit} className="btn btn-primary">
            Add Post
          </button>
          &nbsp;
          <button onClick={loadMore} className="btn btn-primary">
            Load More
          </button>
          &nbsp;
          <ul>
            {posts.map(post => (
              <li key={post.id}>{post.title}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

const mapStateToProps = state => {
  return { posts: state.toDoReducer.posts };
};

const mapDispatchToProps = dispatch => {
  return {
    dispatch
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ToDo);
