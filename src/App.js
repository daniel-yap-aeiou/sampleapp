import React from "react";
import Header from "./components/HeaderComponent/Header";
import Sidebar from "./components/SidebarComponent/Sidebar";
import Main from "./components/RouteComponent/Main";
import "./App.css";
import { withRouter } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import { lightTheme, darkTheme } from "./theme";
import { GlobalStyles } from "./global";

import { useThemeContext } from "./contexts/ThemeContext";

function App({}) {
  const themeContext = useThemeContext();

  return (
    <ThemeProvider
      theme={themeContext.getTheme() === "light" ? lightTheme : darkTheme}
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
