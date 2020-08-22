import React from "react";
import Header from "./components/HeaderComponent/Header";
import Sidebar from "./components/SidebarComponent/Sidebar";
import Main from "./components/RouteComponent/Main";
import "./App.css";
import { withRouter } from "react-router-dom";

function App({}) {
  return (
    <>
      <Header />
      <Sidebar />
      <Main />
    </>
  );
}

export default withRouter(App);
