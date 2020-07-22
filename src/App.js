import React, { useEffect } from "react";
import Header from "./components/HeaderComponent/Header";
import Sidebar from "./components/SidebarComponent/Sidebar";
import Main from "./components/RouteComponent/Main";
import "./App.css";
import { withRouter } from "react-router-dom";

function App({ hideLoader, showLoader }) {
  useEffect(hideLoader, []);

  return (
    <div className="">
      <Header hideLoader={hideLoader} showLoader={showLoader} />
      <Sidebar hideLoader={hideLoader} showLoader={showLoader} />
      <Main hideLoader={hideLoader} showLoader={showLoader} />
    </div>
  );
}

export default withRouter(App);
