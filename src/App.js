import React, {useEffect, useState} from "react";
import { Switch, Route, withRouter } from "react-router-dom";
import {Home, NavBar, Profile, Signin, Signup} from "./components"
import axios from "axios";
import config from "./config";



function App(props) {
  const [user, updateUser] = useState(null)
  const [error, updateError] = useState(null) 
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  
  /*useEffect(()=>{
    props.history.push('/profile')
  }, [user])*/
  
  

  const handleSignup = (e)=>{
    e.preventDefault()
    let {username, email, password} = e.target
    let newUser = {
      username: username.value, 
      email: email.value, 
      password: password.value
    }
    
    axios.post(`${config.API_URL}/api/signup`, newUser, {withCredentials: true})
      .then(() => {
        //updateUser(response.data)
        props.history.push("/signin")
      })
      .catch((errorObj) => {
        updateError(errorObj.response.data.errorMessage)
      })
  }

  const handleSignIn = async (e) => {
    e.preventDefault()
    const { email , password} = e.target
    let newUser = {
      email: email.value, 
      password: password.value
    }

    axios.post(`${config.API_URL}/api/signin`, newUser, {withCredentials: true})
      .then((response) => {
        updateUser(response.data)
        updateError(null)
        props.history.push('/profile')
      })
      .catch((errorObj) => {
        updateError(errorObj.response.data.errorMessage)
      })
  }

  const handleLogout = () => {
    axios.post(`${config.API_URL}/api/logout`, {}, {withCredentials: true})
      .then(() => {
        updateUser(null)
        props.history.push('/')
      })
      .catch((errorObj) => {
        updateError(errorObj.response.data)
    })
  }

  return (
    <div className="App">
      <NavBar onLogout={handleLogout} user={user} />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route  path="/signup"  render={(routeProps) => {
            return  <Signup error={error} onSubmit={handleSignup} {...routeProps}  />
          }}/>
        <Route  path="/signin"  render={(routeProps) => {
            return  <Signin error={error} onSignIn={handleSignIn}  {...routeProps}  />
          }}/>
        <Route path="/profile" render={()=>{
          return <Profile />
        }} />
      </Switch>
    </div>
  );
}

export default withRouter(App);
