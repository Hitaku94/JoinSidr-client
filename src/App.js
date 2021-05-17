import React, { useEffect, useState } from "react";
import { Switch, Route, withRouter } from "react-router-dom";
import {
  Home,
  NavBar,
  Profile,
  Signin,
  Signup,
  AddProject,
} from "./components";
import Settings from "./components/Settings";
import axios from "axios";
import config from "./config";
import Trends from "./components/Trends";
import ProjectDetails from "./components/ProjectDetails";
import EditProject from "./components/EditProject";
import UserProfile from "./components/UserProfile";
import ChoicePage from "./components/ChoicePage";

function App(props) {
  const [user, updateUser] = useState(null);
  const [allUser, updateAllUser] = useState([]);
  const [projects, updateProject] = useState([]);
  const [filteredProjects, updateFilteredProjects] = useState([])
  const [error, updateError] = useState(null);
  const [fetchingUser, updateFetchingUser]= useState(true)
  

  useEffect(() => {
    axios
      .get(`${config.API_URL}/api/trends`, { withCredentials: true })
      .then((response) => {
        updateProject(response.data);
      })
      .catch((err) => {
        console.log("Fecthing failed");
      });

      axios
      .get(`${config.API_URL}/api/trends`, { withCredentials: true })
      .then((response) => {
        updateFilteredProjects(response.data);
      })
      .catch((err) => {
        console.log("Fecthing failed");
      });
      
      fetchUser()
      console.log(fetchUser())
      users()
      console.log(users())
      

  },[]);

  const users = () => {
    axios.get(`${config.API_URL}/api/usersProfile`, { withCredentials: true })
      .then((response) => {
        updateAllUser(response.data)
        console.log(response.data)
      }).catch((err) => {
        console.log("users doesn't work")
      });
  }

 const fetchUser = ()=>{
    axios
    .get(`${config.API_URL}/api/profile`, { withCredentials: true })
    .then((response) => {
      updateUser(response.data)
      console.log(response.data)
      updateFetchingUser(false)
      
    }).catch((err) => {
      console.log("user not logged in")
      updateFetchingUser(false)
    });
  }

  const handleChangeUser = (event) =>
  updateUser({
    ...user,
    [event.currentTarget.name]: event.currentTarget.value,
  });

  const handleSignup = (e) => {
    e.preventDefault();
    let { username, email, password } = e.target;
    let newUser = {
      username: username.value,
      email: email.value,
      password: password.value,
    };

    axios
      .post(`${config.API_URL}/api/signup`, newUser, { withCredentials: true })
      .then(() => {
        //updateUser(response.data)
        props.history.push("/choice-page");
      })
      .catch((errorObj) => {
        updateError(errorObj.response.data.errorMessage);
      });
  };

  const handleSignIn = async (e) => {
    e.preventDefault();
    const { email, password } = e.target;
    let newUser = {
      email: email.value,
      password: password.value,
    };

    axios
      .post(`${config.API_URL}/api/signin`, newUser, { withCredentials: true })
      .then((response) => {
        console.log(response.data)
        updateUser(response.data);
        updateError(null);
        props.history.push("/profile");
      })
      .catch((errorObj) => {
        updateError(errorObj.response.data.errorMessage);
      });
  };

  const handleLogout = () => {
    axios
      .post(`${config.API_URL}/api/logout`, {}, { withCredentials: true })
      .then(() => {
        updateUser(null);
        props.history.push("/");
        
      })
      .catch((errorObj) => {
        updateError(errorObj.response.data);
      });
  };

  const handleEditSettings = (event) => {
    event.preventDefault();

    let username= event.target.username.value
    let description= event.target.description.value; 
     let country= event.target.country.value;
     let experience= event.target.experience.value;
      /*available: event.target.available.value, 
      workLocation: event.target.worklocation.value, 
      skills: event.target.skills.value,
      ,*/

    let profilePic = event.target.profilePic.files[0];
    let formData = new FormData();
    formData.append("imageUrl", profilePic)
    axios
      .post(`${config.API_URL}/api/upload`, formData)
      .then((response)=>{
        return axios
        .patch(`${config.API_URL}/api/settings`, {username, description, country, experience, profilePic: response.data.image}, {
          withCredentials: true,
        })
      })
      .then((response) => {
        updateUser(response.data);
        props.history.push("/profile");
      })
      .catch((err) => updateError(err.response.data));
  };

  const handleCreateProject = (e) => {
    e.preventDefault();
    let title = e.target.title.value;
    let type = e.target.type.value;
    let description = e.target.description.value;
    let image = e.target.image.files[0];

    let formData = new FormData();
    formData.append("imageUrl", image);

    axios
      .post(`${config.API_URL}/api/upload`, formData)
      .then((response) => {
        return axios.post(
          `${config.API_URL}/api/project-create`,
          {
            title: title,
            type: type,
            description: description,
            image: response.data.image,
          },
          { withCredentials: true }
        );
      })
      .then((response) => {
        updateProject([response.data, ...projects]);
      })
      .catch(() => {
        console.log("Image upload failed");
      });
  };

  const handleEditProject = (e, projectId) => {
    e.preventDefault()

    let title = e.target.title.value;
    let type = e.target.type.value;
    let description = e.target.description.value;
    let image = e.target.image.files[0];
    
    let formData = new FormData();
    formData.append("imageUrl", image);

    axios
      .post(`${config.API_URL}/api/upload`, formData)
      .then((response) => {
        return axios.patch(
          `${config.API_URL}/api/project/${projectId}`, 
          {
            title: title,
            type: type,
            description: description,
            image: response.data.image,
          },
           {withCredentials: true,}
        );
      })
      .then((response) => {
        console.log(image)
        updateProject(response.data)
      }) 
      .catch(() => {
        console.log("Edit project failed");
      });
  };
  
  const handleDeleteProject = (projectId) => {
    axios.delete(`${config.API_URL}/api/project/${projectId}`, {withCredentials: true})
      .then(() => {
        let filteredProject = projects.filter((project) => {
          return project._id !== projectId
        })
        updateProject(filteredProject)
        props.history.push("/profile");
      }).catch((err) => {
        console.log('Delete failed', err)
      });
  }

  const handleSearch = (e) => {
    // since our onChange event listener is on the input
    // e.target will give us  the input DOM
    let input  = e.target.value 
    console.log(input)
    let filteredProjects = projects.filter((singleProject) => {
      // converting to same case 
      // checking if the input includes in the books title
      return singleProject.title.toLowerCase().includes(input.toLowerCase())
    })
    updateFilteredProjects(filteredProjects)
  }


  if(fetchingUser){
    return <h1>Loading</h1>
  }

  return (
    <div className="App">
      <NavBar onLogout={handleLogout} user={user} />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route
          path="/signup"
          render={(routeProps) => {
            return (
              <Signup error={error} onSubmit={handleSignup} {...routeProps} />
            );
          }}
        />
        <Route
          path="/signin"
          render={(routeProps) => {
            return (
              <Signin error={error} onSignIn={handleSignIn} {...routeProps} />
            );
          }}
        />
        <Route
          exact
          path="/profile"
          render={(routeProps) => {
            return <Profile user={user} projects={projects} {...routeProps} />;
          }}
        />
        <Route
          exact
          path="/settings"
          render={(routeProps) => {
            return (
              <Settings
                onEdit={handleEditSettings}
                loggedInUser={user}
                onChange={handleChangeUser}
                fetchingUser={fetchUser}
                {...routeProps}
              />
            );
          }}
        />
        <Route
          exact
          path="/project-create"
          render={(routeProps) => {
            return <AddProject onAdd={handleCreateProject} {...routeProps} />;
          }}
        />
        <Route
          exact
          path="/trends"
          render={(routeProps) => {
            return <Trends onSearch={handleSearch} projects={filteredProjects} {...routeProps} />;
          }}
        />
         <Route
          exact
          path="/project/:id"
          render={(routeProps) => {
            return <ProjectDetails projects={projects} user={user} allUser={allUser} onDelete={handleDeleteProject} {...routeProps} />;
          }}
        />
        <Route
          exact
          path="/project-edit/:id"
          render={(routeProps) => {
            return <EditProject onEdit={handleEditProject} {...routeProps} />;
          }}
        />
        <Route
          exact
          path="/user/:id"
          render={(routeProps) => {
            return <UserProfile {...routeProps} />;
          }}
        />
        <Route
          exact
          path="/choice-page"
          render={(routeProps) => {
            return <ChoicePage {...routeProps} />;
          }}
        />
      </Switch>
    </div>
  );
}

export default withRouter(App);
