import React, { useEffect } from "react";

//import Navbar from "./Navbar";
import Home1 from "./Home";
import Cart from "./Cart";
import { Switch, Route, withRouter } from "react-router-dom";

function Index(props) {

    useEffect(() => {
      const user = localStorage.getItem("user");
  
      if (user == null) {
        props.history.push("/login");
      }
    }, [props.history]);
  
    const Page404 = ({ location }) => (
      <div>
        <h2>
          No match found for <code>{location.pathname}</code>
        </h2>
      </div>
    );
  
    return (
      <main>
        <Switch>
  
          <Route exact path="/Shopping" component={Home1} />
          <Route path="/cart" component={Cart} />
  
          <Route component={Page404} />
        </Switch>
      </main>
    );
  }
  
  export default withRouter(Index);
  