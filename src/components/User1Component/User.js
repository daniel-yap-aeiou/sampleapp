import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import {
  getUsersRequest,
  deleteUserRequest,
  createUserRequest,
  resetUsersRequest,
} from "../../actions/users";

import { withRouter } from "react-router-dom";
import { Spinner } from "react-bootstrap";
import "./User.css";

import { useUtilContext } from "../../contexts/UtilContext";

const ToDo = (props) => {
  const utilContext = useUtilContext();

  let {
    users,
    //dispatch,
    getUsersRequest,
    deleteUserRequest,
    createUserRequest,
    resetUsersRequest,
  } = props;

  const [message, setMessage] = useState("Nothing to display");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [loaderClass, setLoaderClass] = useState("hide");

  useEffect(() => {
    users.items = [];
    setMessage("Nothing to display");

    getUsersRequest();

    if (users.error) {
      setMessage(users.error);
    }

    setTimeout(() => {
      utilContext.hideLoader();
    }, 1000);

    return () => {
      utilContext.hideLoader();
      console.log("cleaned up");
    };
  }, []);

  function filterDelete(item, id) {
    if (parseInt(item.userId) !== parseInt(id)) {
      return true;
    }
    return false;
  }

  function handleDelete(event) {
    let id = event.target.getAttribute("data-id");
    let userObject = users.items.filter((item) => filterDelete(item, id));
    deleteUserRequest(userObject);
  }

  const handleReset = (e) => {
    e.preventDefault();
    users.items = [];
    resetUsersRequest();
  };

  const handleFirstName = (e) => {
    let fn = e.target.value;
    setFirstName((prevValue) => (prevValue = fn));
  };

  const handleLastName = (e) => {
    let ln = e.target.value;
    setLastName((prevValue) => (prevValue = ln));
  };

  const handleAddUser = (e) => {
    if (firstName === "" || lastName === "") return false;
    setLoaderClass((prevValue) => (prevValue = "show"));
    createUserRequest({ firstName, lastName });
    setFirstName((prevValue) => (prevValue = ""));
    setLastName((prevValue) => (prevValue = ""));

    setTimeout(() => {
      getUsersRequest();
      setLoaderClass((prevValue) => (prevValue = "hide"));
    }, 3000);
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-lg-6">
          <button className="btn btn-info" onClick={handleReset}>
            Reset
          </button>
          <br />
          <br />
          <label>FirstName</label>
          <input
            type="text"
            onChange={handleFirstName}
            value={firstName}
            className="form-control"
          />
          <label>LastName</label>
          <input
            type="text"
            onChange={handleLastName}
            value={lastName}
            className="form-control"
          />
          <br />
          <button className="btn btn-success" onClick={handleAddUser}>
            Submit
          </button>&nbsp;
          <Spinner animation="border" role="status" className={loaderClass}>
            <span className="sr-only">Loading...</span>
          </Spinner>
          <br />
          <br />
          {users.items.length === 0 ? (
            <div>{message}</div>
          ) : (
            <table className="table">
              <tbody>
                {users.items.map((s) => {
                  return (
                    <tr key={s.userId}>
                      <td>{s.firstName}</td>
                      <td>{s.lastName}</td>
                      <td>
                        <button
                          className="btn btn-sm btn-danger"
                          onClick={handleDelete}
                          data-id={s.userId}
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

const mapStateToProps = (state) => {
  return { users: state.users };
};

const mapDispatchToProps = (dispatch) => {
  return {
    dispatch,
  };
};

export default connect(mapStateToProps, {
  mapDispatchToProps,
  getUsersRequest,
  deleteUserRequest,
  createUserRequest,
  resetUsersRequest,
})(withRouter(ToDo));
