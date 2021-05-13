import React, { useEffect, useState } from "react";
import { Switch, Route, withRouter } from "react-router-dom";
import { Home, NavBar, Profile, Signin, Signup, AddProject } from "./components"
import axios from "axios";
import config from "./config";
import Trends from "./components/Trends";




function App(props) {
  const [user, updateUser] = useState(null)
  const [projects, updateProject] = useState([])
  const [error, updateError] = useState(null)

  useEffect(() => {
    axios.get(`${config.API_URL}/api/trends`, {withCredentials: true})
      .then((response) => {
        console.log(response.data)
        updateProject(response.data)
      }).catch(() => {
        console.log('Fecthing failed')
      });
  }, [])


  const handleSignup = (e) => {
    e.preventDefault()
    let { username, email, password } = e.target
    let newUser = {
      username: username.value,
      email: email.value,
      password: password.value
    }

    axios.post(`${config.API_URL}/api/signup`, newUser, { withCredentials: true })
      .then((response) => {
        updateUser(response.data)
      })
      .catch(() => {
        console.log('SignUp failed')
      })
  }

  const handleSignIn = async (e) => {
    e.preventDefault()
    const { email, password } = e.target
    let newUser = {
      email: email.value,
      password: password.value
    }

    axios.post(`${config.API_URL}/api/signin`, newUser, { withCredentials: true })
      .then((response) => {
        updateUser(response.data)
        updateError(null)
      })
      .catch((errorObj) => {
        updateError(errorObj.response.data)
      })
  }

  const handleCreateProject = (e) => {
    e.preventDefault()
    let title = e.target.title.value
    let type = e.target.type.value
    let description = e.target.description.value
    let image = e.target.image.files[0]

    let formData = new FormData()
    formData.append('imageUrl', image)

    axios.post(`${config.API_URL}/api/upload`, formData)
      .then((response) => {
        return axios.post(`${config.API_URL}/api/project-create`, {
          title: title,
          type: type,
          description: description,
          image: response.data.image
        }, {withCredentials: true})
      })
      .then((response) => {
        updateProject([response.data, ...projects])
      })
      .catch(() => {
        console.log('Image upload failed')
      });

  }


  return (
    <div className="App">
      <NavBar />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/signup" render={(routeProps) => {
          return <Signup onSubmit={handleSignup} {...routeProps} />
        }} />
        <Route path="/signin" render={(routeProps) => {
          return <Signin onSignIn={handleSignIn}  {...routeProps} />
        }} />
        <Route exact path="/profile" render={(routeProps) => {
          return <Profile {...routeProps} />
        }} />
         <Route exact path="/project-create" render={(routeProps) => {
          return <AddProject onAdd={handleCreateProject} {...routeProps} />
        }} />
        <Route exact path="/trends" render={(routeProps) => {
          return <Trends projects={projects} {...routeProps} />
        }} />
      </Switch>
    </div>
  );
}

export default withRouter(App);
