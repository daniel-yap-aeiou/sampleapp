import React from "react";
import Header from "./components/HeaderComponent/Header";
import Sidebar from "./components/SidebarComponent/Sidebar";
import Main from "./components/RouteComponent/Main";
import "./App.css";
import { withRouter } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import { lightTheme, darkTheme, pinkTheme, purpleTheme, blackTheme } from "./theme";
import { GlobalStyles } from "./global";

import { useThemeContext } from "./contexts/ThemeContext";

function App() {
  const themeContext = useThemeContext();

  const resolveTheme = () => {
    const theme = themeContext.getTheme();
    if (theme === "light") {
      return lightTheme;
    }
    else if (theme === "dark") {
      return darkTheme;
    }
    else if (theme === "pink") {
      return pinkTheme;
    }
    else if (theme === "purple") {
      return purpleTheme;
    }
    else if (theme === "black") {
      return blackTheme;
    }
    else {
      return lightTheme;
    }
  };

  return (
    <ThemeProvider
      theme={resolveTheme}
    >
      <>
        <GlobalStyles />
        <Header />
        <Sidebar />
        <Main />
      </>
    </ThemeProvider>
  );
}

export default withRouter(App);
