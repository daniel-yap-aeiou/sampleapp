import axios from "axios";
import "../util/window";

const temp = "@$2b$10$9CGSrW4RdtgJxYLjKH9sX.VvBdSrfELBEv7." + process.env.REACT_APP_JSONBIN_ENDING_API_KEY;
const KEY = window.app.decrypt(temp);
const binId = "5f1b8d9ec1edc466175dcc15";

export const getUsers = () => {
  let header = {
    headers: {
      "Access-Control-Allow-Origin": "*",
      "secret-key": KEY,
    },
    withCredentials: false,
    credentials: "same-origin",
  };

  return new Promise((resolve) => {
    axios
      .get(`https://api.jsonbin.io/b/${binId}`, header)
      .then((result) => {
        return resolve(result);
      })
      .catch((err) => {
        throw resolve(err);
      });
  });
};

export const createUser = ({ firstName, lastName }) => {
  let header1 = {
    headers: {
      "Access-Control-Allow-Origin": "*",
      "secret-key": KEY,
    },
    withCredentials: false,
    credentials: "same-origin",
  };

  let header2 = {
    headers: {
      "Access-Control-Allow-Origin": "*",
      "secret-key": KEY,
      versioning: false,
    },
    withCredentials: false,
    credentials: "same-origin",
  };

  axios
    .get(`https://api.jsonbin.io/b/${binId}`, header1)
    .then((result) => {
      let temp = result.data.users;

      if (temp) {
        const nextId = temp.length + 1;
        temp.push({ userId: nextId, firstName, lastName });

        return new Promise((resolve) => {
          axios
            .put(`https://api.jsonbin.io/b/${binId}`, { users: temp }, header2)
            .then((result) => {
              return resolve(result);
            })
            .catch((err) => {
              throw resolve(err);
            });
        });
      }
    })
    .catch((err) => {
      throw err;
    });

  return true;
};

export const deleteUser = ({ userObject }) => {
  let header = {
    headers: {
      "Access-Control-Allow-Origin": "*",
      "secret-key": KEY,
      versioning: false,
    },
    withCredentials: false,
    credentials: "same-origin",
  };

  return new Promise((resolve) => {
    axios
      .put(`https://api.jsonbin.io/b/${binId}`, { users: userObject }, header)
      .then((result) => {
        return resolve(result);
      })
      .catch((err) => {
        throw resolve(err);
      });
  });
};

export const resetUsers = () => {
  let header = {
    headers: {
      "Access-Control-Allow-Origin": "*",
      "secret-key": KEY,
      versioning: false,
    },
    withCredentials: false,
    credentials: "same-origin",
  };

  let users = [
    {
      userId: 1,
      firstName: "First Test 1",
      lastName: "Last Test 1",
    },
    {
      userId: 2,
      firstName: "First Test 2",
      lastName: "Last Test 2",
    },
    {
      userId: 3,
      firstName: "First Test 3",
      lastName: "Last Test 3",
    },
  ];

  return new Promise((resolve) => {
    axios
      .put(`https://api.jsonbin.io/b/${binId}`, { users }, header)
      .then((result) => {
        return resolve(result);
      })
      .catch((err) => {
        throw resolve(err);
      });
  });
};
