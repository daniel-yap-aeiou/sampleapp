import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import URLS from "../../util/constants";
import actionTypes from "../../util/actionTypes";
import { withRouter } from "react-router-dom";
import "./Comment.css";
import { useUtilContext } from "../../contexts/UtilContext";
import { TD } from "../../Theme/styles";

function Comment({ comments, dispatch, props }) {
  const utilContext = useUtilContext();
  let [comment, setComment] = useState("");
  //let [commentsCount, setCommentsCount] = useState(comments.length);

  useEffect(() => {
    setTimeout(() => {
      utilContext.hideLoader();
    }, 1000);

    return () => {
      utilContext.hideLoader();
      console.log("cleaned up");
    };
  });

  function handleChange(event) {
    let val = event.target.value;
    setComment(prevValue => prevValue = val);
  }

  function handleSubmit(event) {
    if (comment == null || comment === undefined || comment === "")
      return false;

    //let result = comments.map((a) => a.id);
    //let max = Math.max.apply(null, result);
    //let newId = max + 1;
    let newId = Math.random();
    dispatch({
      type: actionTypes.ADD_COMMENT,
      payload: { id: newId, title: comment },
    });

    setComment(prevValue => prevValue ="");
    //setCommentsCount(comments.length);
  }

  function loadMore() {
    fetch(URLS.POSTS_RANDOM)
      .then((response) => response.json())
      .then((json) => {
        dispatch({
          type: actionTypes.LOAD_COMMENTS,
          payload: json,
        });
      });
  }

  function handleDelete(id) {
    dispatch({
      type: actionTypes.DEL_COMMENT,
      payload: { id: id },
    });
  }

  const handleCheck = (e) => {
    var x = e;
    if (x.currentTarget.firstChild.innerHTML) {
      x.currentTarget.firstChild.innerHTML = "";
      x.currentTarget.childNodes[1].style = "";
    } else {
      x.currentTarget.firstChild.innerHTML =
        "<i class='fa fa-check' aria-hidden='true'></i>";
      x.currentTarget.childNodes[1].style = "text-decoration: line-through";
    }
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-lg-6">
          <label>Comment:</label>&nbsp;
          <input
            type="text"
            onChange={handleChange}
            value={comment}
            className="form-control"
          />
          <br />
          <button onClick={handleSubmit} className="btn btn-primary">
            Add Comment
          </button>
          &nbsp;
          <button onClick={loadMore} className="btn btn-primary">
            Load More
          </button>
          &nbsp;
          <br />
          <br />
          <div className="table-responsive">
            <table className="table table-striped table-bordered">
              <tbody>
                {comments.map((comment) => (
                  <tr key={comment.id} onClick={handleCheck}>
                    <TD className=""></TD>
                    <TD>{comment.title}</TD>
                    <TD>
                      <button
                        className="btn btn-danger"
                        onClick={() => handleDelete(comment.id)}
                      >
                        X
                      </button>
                    </TD>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

const mapStateToProps = (state, ownProps) => {
  return { comments: state.commentReducer.comments, props: ownProps };
};

const mapDispatchToProps = (dispatch) => {
  return {
    dispatch,
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(Comment));
