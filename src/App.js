import React, {useEffect, useState} from "react";
import { Switch, Route, withRouter } from "react-router-dom";
import {Home, NavBar} from "./components"
import Profile from "./components/Profile";
import Signin from "./components/Signin";
import Signup from "./components/Signup";
import axios from "axios";
import config from "./config";



function App() {
  const [user, updateUser] = useState(null)
  

  

  const handleSignup = (e)=>{
    e.preventDefault()
    const {username, email, password} = e.target
    let newUser = {
      username: username.value, 
      email: email.value, 
      password: password.value
    }
    
    axios.post(`${config.API_URL}/api/signup`, newUser, {withCredentials: true})
      .then((response) => {
        updateUser(response.data)
      })
      .catch(() => {
        console.log('SignUp failed')
      })
    
  }

  return (
    <div className="App">
      <NavBar />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route  path="/signup"  render={(routeProps) => {
            return  <Signup onSubmit={handleSignup} {...routeProps}  />
          }}/>
        <Route path="/signin" component={Signin} />
        <Route path="/profile" component={Profile} />
      </Switch>
    </div>
  );
}

export default withRouter(App);
