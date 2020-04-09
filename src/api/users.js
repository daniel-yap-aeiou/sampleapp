import axios from "axios";

export const getUsers = () => {
  let header = {
    headers: { "Access-Control-Allow-Origin": "*" },
    withCredentials: false,
    credentials: "same-origin"
  };

  return new Promise(resolve => {
    axios
      .get(
        "https://cors-anywhere.herokuapp.com/https://rem.dbwebb.se/api/users",
        header
      )
      .then(result => {
        return resolve(result);
      })
      .catch(err => {
        throw resolve(err);
      });
  });
};

export const createUser = ({ firstName, lastName }) => {
  let header = {
    headers: { "Access-Control-Allow-Origin": "*" },
    withCredentials: false,
    credentials: "same-origin"
  };

  return new Promise(resolve => {
    axios
      .post(
        "https://cors-anywhere.herokuapp.com/https://rem.dbwebb.se/api/users",
        {
          firstName,
          lastName
        },
        header
      )
      .then(result => {
        console.log("CreateUser ...");
        return resolve(result);
      })
      .catch(err => {
        throw resolve(err);
      });
  });

};

export const deleteUser = userId => {
  let header = {
    headers: { "Access-Control-Allow-Origin": "*" },
    withCredentials: false,
    credentials: "same-origin"
  };

  return new Promise(resolve => {
    axios
      .delete(
        `https://cors-anywhere.herokuapp.com/https://rem.dbwebb.se/api/users/${userId}`,
        header
      )
      .then(result => {
        return resolve(result);
      })
      .catch(err => {
        throw resolve(err);
      });
  });
};