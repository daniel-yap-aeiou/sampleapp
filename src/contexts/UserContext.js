import React, { useContext } from "react";

const UserContext = React.createContext();

const USER_KEY = 'sample-react-app-user';

export const useUserContext = () => {
  return useContext(UserContext);
};

export function UserProvider({ children }) {

  const IsUserLoggedIn = () => {
    const user = localStorage.getItem(USER_KEY);

    return user != null;
  };

  const GetStatus = () => {
    if (IsUserLoggedIn()) {
      const user = localStorage.getItem(USER_KEY);
      const userJson = JSON.parse(user);
      return userJson.status;
    }

    return "Offline";
  };

  const GetUserEmailAddress = () => {
    if (IsUserLoggedIn()) {
      const user = localStorage.getItem(USER_KEY);
      const userJson = JSON.parse(user);
      return userJson.email;
    }

    return "";
  };

  const SignOut = () => {
    localStorage.removeItem(USER_KEY);
  };

  const SignIn = (payload) => {
    if (payload) {
      localStorage.setItem(USER_KEY, JSON.stringify(payload));
    }
  };

  const HomePage = () => {
    return "/redditclientapi";
  };

  const context = {
    IsUserLoggedIn,
    GetStatus,
    GetUserEmailAddress,
    SignOut,
    SignIn,
    HomePage,
  };

  return (
    <UserContext.Provider value={context}>{children}</UserContext.Provider>
  );
}
