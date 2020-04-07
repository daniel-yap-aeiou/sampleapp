import React, { useState, useEffect } from "react";
import "./App.css";
import { connect } from "react-redux";
import { getUsersRequest } from "./actions/users";

const ToDo = props => {
  let { users, dispatch, getUsersRequest } = props;

  useEffect(() => {
    console.log(getUsersRequest);

    getUsersRequest();

    console.log(users);

    return () => {
      console.log("cleaned up");
    };
  }, [users]);

  

  return (
    <div className="container">
      <div className="row">
        <div className="col-lg-6">
          
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
  getUsersRequest
})(ToDo);
