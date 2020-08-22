import React from "react";

const UserContext = React.createContext();

export const IsUserLoggedIn = () => {
  const user = localStorage.getItem("user");

  return user != null;
};

export const GetUserEmailAddress = () => {
  if (IsUserLoggedIn()) {
    const user = localStorage.getItem("user");
    const userJson = JSON.parse(user);
    return userJson.email;
  }

  return "";
};

export const SignOut = () => {
  localStorage.removeItem("user");
};

export const SignIn = (payload) => {
  if (payload) {
    localStorage.setItem("user", JSON.stringify(payload));
  }
};

export function UserProvider({ children }) {
  return <UserContext.Provider>{children}</UserContext.Provider>;
}
