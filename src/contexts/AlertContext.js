import React, { useContext, useState } from "react";

const AlertContext = React.createContext();

export const useAlertContext = () => {
  return useContext(AlertContext);
};

export function AlertProvider({ children }) {
  const [message, setMessage] = useState("");

  const setAlert = (text) => {
    setMessage((pv) => (pv = text));
  };

  const getAlert = () => {
      return message;
  }

  const context = {
    setAlert,
    getAlert
  };

  return (
    <AlertContext.Provider value={context}>{children}</AlertContext.Provider>
  );
}
