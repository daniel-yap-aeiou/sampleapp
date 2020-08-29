import React, { useContext, useState, useEffect } from "react";

const ThemeContext = React.createContext();

export const useThemeContext = () => {
  return useContext(ThemeContext);
};

export function AppThemeProvider({ children }) {
  const [theme, setTheme] = useState('light');

  const toggleTheme = (theme) => {
    localStorage.setItem("theme", JSON.stringify(theme));
    setTheme((pv) => (pv = theme));
  };

  const getTheme = () => {
    const theme = localStorage.getItem("theme");
    const themeJson = JSON.parse(theme);
    if (themeJson !== null) {
      return themeJson;
    }
  };

  const context = {
    toggleTheme,
    getTheme,
  };

  useEffect(() => {
    const localTheme = getTheme();
    localTheme && toggleTheme(localTheme);
  }, []);

  return (
    <ThemeContext.Provider value={context}>{children}</ThemeContext.Provider>
  );
}
