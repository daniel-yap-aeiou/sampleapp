import React, { useContext } from "react";
import { useHistory } from "react-router";

const TitleContext = React.createContext();

export const useTitleContext = () => {
  return useContext(TitleContext);
};

export function TitleProvider({ children }) {
  const history = useHistory();

  const capitalize = (s) => {
    if (typeof s !== "string") return "";
    return s.charAt(0).toUpperCase() + s.slice(1);
  };

  const getTitle = capitalize(
    history.location.pathname.substring(1, history.location.pathname.length)
  );

  const context = {
    getTitle,
  };

  return (
    <TitleContext.Provider value={context}>{children}</TitleContext.Provider>
  );
}
