import React, { useState, useEffect } from "react";
import Home from './Home';
import ToDo from './ToDo';
import ToComment from './ToComment';
import { Switch, Route, BrowserRouter } from 'react-router-dom';

// The Main component renders one of the three provided
// Routes (provided that one matches). Both the /roster
// and /schedule routes will match any pathname that starts
// with /roster or /schedule. The / route will only match
// when the pathname is exactly the string "/"
const Main = () => (
  <main>
    <Switch>
      <Route exact path='/' component={Home}/>
      <Route path='/todo' component={ToDo}/>
      <Route path='/toComment' component={ToComment}/>
    </Switch>
  </main>
)

export default Main
