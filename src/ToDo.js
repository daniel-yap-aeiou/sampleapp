import React, { useState, useEffect } from "react";
import "./App.css";
import { connect } from "react-redux";
import {
  getUsersRequest,
  deleteUserRequest,
  createUserRequest
} from "./actions/users";

const ToDo = props => {
  let {
    users,
    dispatch,
    getUsersRequest,
    deleteUserRequest,
    createUserRequest
  } = props;

  useEffect(() => {
    getUsersRequest();

    return () => {
      console.log("cleaned up");
    };
  }, [getUsersRequest]);

  function handleDelete(event) {
    let id = event.target.getAttribute("data-id");

    console.log(id);
    deleteUserRequest(id);
    //createUserRequest({ firstName: "Test", lastName: "123" });
  }

  return (
    <div className="container">
      <div className="row">
        <div className="col-lg-6">
          {users.items.length === 0 ? (
            <div>Nothing to display</div>
          ) : (
            <table className="table">
              <tbody>
                {users.items.map(s => {
                  return (
                    <tr key={s.id}>
                      <td>{s.firstName}</td>
                      <td>{s.lastName}</td>
                      <td>
                        <button
                          className="btn btn-sm btn-danger"
                          onClick={handleDelete}
                          data-id={s.id}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = state => {
  return { users: state.users };
};

const mapDispatchToProps = dispatch => {
  return {
    dispatch
  };
};

export default connect(mapStateToProps, {
  mapDispatchToProps,
  getUsersRequest,
  deleteUserRequest,
  createUserRequest
})(ToDo);
