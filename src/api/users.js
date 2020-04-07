import axios from "axios";

export const getUsers = () => {
  return axios.get(
    "https://cors-anywhere.herokuapp.com/https://rem.dbwebb.se/api/users",
    {
      params: {
        limit: 1000
      }
    }
  );
};

export const createUser = ({ firstName, lastName }) => {
  return axios.post(
    "https://cors-anywhere.herokuapp.com/https://rem.dbwebb.se/api/users",
    {
      firstName,
      lastName
    }
  );
};

export const deleteUser = userId => {
  return axios.delete(
    `https://cors-anywhere.herokuapp.com/https://rem.dbwebb.se/api/users/${userId}`
  );
};
