import React, { useContext } from "react";

const UserContext = React.createContext();

export const useUserContext = () => {
  return useContext(UserContext);
};

export function UserProvider({ children }) {
  const IsUserLoggedIn = () => {
    const user = localStorage.getItem("user");

    return user != null;
  };

  const GetUserEmailAddress = () => {
    if (IsUserLoggedIn()) {
      const user = localStorage.getItem("user");
      const userJson = JSON.parse(user);
      return userJson.email;
    }

    return "";
  };

  const SignOut = () => {
    localStorage.removeItem("user");
  };

  const SignIn = (payload) => {
    if (payload) {
      localStorage.setItem("user", JSON.stringify(payload));
    }
  };

  const context = {
    IsUserLoggedIn,
    GetUserEmailAddress,
    SignOut,
    SignIn,
  };

  return (
    <UserContext.Provider value={context}>{children}</UserContext.Provider>
  );
}
