import React from "react";

const LoaderContext = React.createContext();

const loader = document.querySelector(".loader-main");

// if you want to show the loader when React loads data again
export const showLoader = () => loader.classList.remove("loader--hide");
export const hideLoader = () => loader.classList.add("loader--hide");

export function LoaderProvider({ children }) {
  return <LoaderContext.Provider>{children}</LoaderContext.Provider>;
}
