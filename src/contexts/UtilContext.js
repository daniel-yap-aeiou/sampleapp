import React, { useContext } from "react";

const UtilContext = React.createContext();

export const useUtilContext = () => {
  return useContext(UtilContext);
};

export function UtilProvider({ children }) {
  const loader = document.getElementById("loader-main");

  const showLoader = () => loader.classList.remove("loader--hide");
  const hideLoader = () => loader.classList.add("loader--hide");

  const closeNav = () => {
    document.getElementById("mySidebar").style.width = "0";
  };

  /* Set the width of the sidebar to 250px and the left margin of the page content to 250px */
  const openNav = () => {
    document.getElementById("mySidebar").style.width = "250px";
  };

  const context = {
    showLoader,
    hideLoader,
    closeNav,
    openNav,
  };

  return (
    <UtilContext.Provider value={context}>{children}</UtilContext.Provider>
  );
}
