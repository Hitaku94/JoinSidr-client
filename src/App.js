import React from "react";
import { Switch, Route } from "react-router-dom";
import {Home, NavBar} from "./components"
import Signin from "./components/Signin";
import Signup from "./components/Signup";


function App() {
  return (
    <div className="App">
      <NavBar />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/signup" component={Signin} />
        <Route path="/signin" component={Signup} />
      </Switch>
    </div>
  );
}

export default App;
