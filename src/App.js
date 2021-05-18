import React, { useEffect, useState } from "react";
import { Switch, Route, withRouter, Redirect } from "react-router-dom";
import {
  Home,
  NavBar,
  Profile,
  Signin,
  Signup,
  AddProject,
} from "./components";
import ChatPage from "./components/chatPages/ChatPage";
import UserList from "./components/chatPages/UserList";
import Settings from "./components/Settings";
import axios from "axios";
import config from "./config";
import Trends from "./components/Trends";
import ProjectDetails from "./components/ProjectDetails";
import EditProject from "./components/EditProject";
import UserProfile from "./components/UserProfile";
import ChoicePage from "./components/ChoicePage";
import AccountForm from "./components/AccountForm"

function App(props) {

  const [user, updateUser] = useState(null);
  const [users, updateUsers] = useState([]);
  const [projects, updateProject] = useState([]);
  const [filteredProjects, updateFilteredProjects] = useState([])
  const [error, updateError] = useState(null);
  const [fetchingUser, updateFetchingUser] = useState(true);
  const [showLoading, updateShowloading] = useState(true);
  const [redirect, updateRedirect] = useState(null)
  const [profileRedirect, updateProfileRedirect] = useState(false)

  


  useEffect(() => {
    axios
      .get(`${config.API_URL}/api/trends`, { withCredentials: true })
      .then((response) => {
        updateProject(response.data);
        updateFilteredProjects(response.data);
      })
      .catch((err) => {
        console.log("Fecthing failed");
      });
    
      fetchUser();
      fetchUsers();
      
    
  },[]);

  useEffect(() => {
    if(redirect === "signin") {
      props.history.push("/signin")
  } else if (redirect === "") {
      props.history.push("/")
  } else if (redirect === "afterSignIn") {
    if(!user.userType) {
      props.history.push("/choice-page")
    } else {
      props.history.push("/profile")
    }
  } else if (redirect === "profile") {
    props.history.push("/profile")
  }
  }, [props.history, redirect])

  useEffect(() => {
    if (profileRedirect == true)  {
      props.history.push("/profile")
      updateProfileRedirect(false)
    }
  }, [profileRedirect])

  const fetchUser = ()=>{
    axios
    .get(`${config.API_URL}/api/profile`, { withCredentials: true })
    .then((response) => {
      updateUser(response.data)
      updateFetchingUser(false)
      
    }).catch((err) => {
      console.log("user not logged in")
      updateFetchingUser(false)
    });
  }

  
  
  const fetchUsers = () => {
    axios
      .get(`${config.API_URL}/api/users`, { withCredentials: true })
      .then((response) => {
        console.log(response.data);
        updateUsers(response.data);
      })
      .catch((err) => {
        console.log("user not logged in");
      });
  };
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
      .then((response) => {
        updateUser(response.data)
        updateRedirect("signin")
        
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
        updateUser(response.data);
        updateError(null);
        updateRedirect("afterSignIn")
        
      })
      .catch((errorObj) => {
        updateError(errorObj.response.data.errorMessage);
      });
  };

  // 3rd party auth
  const handleGoogleSuccess = (data) => {
    updateShowloading(true);

    const { givenName, familyName, email, imageUrl, googleId } =
      data.profileObj;
    let newUser = {
      firstName: givenName,
      lastName: familyName,
      email,
      image: imageUrl,
      googleId,
    };
    console.log(data.profileObj);
    axios
      .post(`${config.API_URL}/api/google/info`, newUser, {
        withCredentials: true,
      })
      .then((response) => {
        updateUser(response.data.data);
        updateError(null);
        updateShowloading(false);
        props.history.push("/profile");
      });
  };

  const handleGoogleFailure = (error) => {
    console.log(error);
  };

  const handleLinkedInSuccess = (data) => {
    updateShowloading(true);

    axios
      .post(
        `${config.API_URL}/api/linkedin/info`,
        { code: data.code },
        { withCredentials: true }
      )
      .then((response) => {
        updateUser(response.data.data);
        updateError(null);
        updateShowloading(false);
        props.history.push("/signin");
      });
  };

  const handleLinkedInFailure = (error) => {
    //TODO: Handle these errors yourself the way you want. Currently the state is not in use
    console.log(error);
  };
  //--------------------------------------------------
  const handleLogout = () => {
    axios
      .post(`${config.API_URL}/api/logout`, {}, { withCredentials: true })
      .then(() => {
        updateUser(null);
        updateRedirect("")
        
      })
      .catch((errorObj) => {
        updateError(errorObj.response.data);
      });
  };

  const handleEditSettings = (event) => {
    event.preventDefault();

    let username = event.target.username.value;
    let description = event.target.description.value;
    let country = event.target.country.value;
    let experience = event.target.experience.value;
    /*available: event.target.available.value, 
      workLocation: event.target.worklocation.value, 
      */
    let skills = event.target.skills.value;

    if (event.target.profilePic.files.length == 0) {
      axios
        .patch(
          `${config.API_URL}/api/settings`,
          { username, description, country, experience, skills },
          {
            withCredentials: true,
          }
        )
        .then((response) => {
          updateUser(response.data);
        })
        .catch((err) => updateError(err.response.data));
    } else {
      let profilePic = event.target.profilePic.files[0];
      let formData = new FormData();
      formData.append("imageUrl", profilePic);
      axios
        .post(`${config.API_URL}/api/upload`, formData)
        .then((response) => {
          return axios.patch(
            `${config.API_URL}/api/settings`,
            {
              username,
              description,
              country,
              experience,
              profilePic: response.data.image,
            },
            {
              withCredentials: true,
            }
          );
        })
        .then((response) => {
          updateUser(response.data);
        })
        .catch((err) => updateError(err.response.data));
    }
  };

  const handleSecurity = (event) => {
    event.preventDefault();
    let username = event.target.username.value;
    let password = event.target.password.value;
    let country = event.target.country.value;
    axios
        .patch(
          `${config.API_URL}/api/security`,
          { username, password, country},
          {
            withCredentials: true,
          }
        )
        .then((response) => {
          updateUser(response.data);
        })
        .catch((err) => updateError(err.response.data));
  };

  const handleDeleteUser = (event) => {
    event.preventDefault();
    axios
      .delete(`${config.API_URL}/api/settings`, { withCredentials: true })
      .then(() => {
        updateUser(null);
        props.history.push("/");
      })
      .catch(() => {
        console.log("delete user failed");
      });
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
        updateFilteredProjects([response.data, ...filteredProjects]);
        updateProfileRedirect(true)
      })
      .catch(() => {
        console.log("Image upload failed");
      });
  };

  const handleEditProject = (e, projectId) => {
    e.preventDefault();

    let title = e.target.title.value;
    let type = e.target.type.value;
    let description = e.target.description.value;


    if (e.target.image.files.length == 0) {
      axios.patch(
        `${config.API_URL}/api/project/${projectId}`, 
        {
          title: title,
          type: type,
          description: description,
        },
         {withCredentials: true,})
    .then((response) => {
      
      let clonedProjects = projects.map((e) => {
        if (projectId == e._id) {
          return response.data
        }
        else {
          return e
        }
      }) 
      updateProject(clonedProjects);
      updateProfileRedirect(true)
    }) 
    .catch(() => {
      console.log("Edit project failed");
    });
    }
    else {
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
          { withCredentials: true }
        );
      })
      .then((response) => {
        let clonedProjects = projects.map((e) => {
          if (projectId == e._id) {
            return response.data
          }
          else {
            return e
          }
        }) 
        updateProject(clonedProjects);
        updateProfileRedirect(true)
      }) 
      .catch(() => {
        console.log("Edit project failed");
      });
    }
    
  };

  const handlOnChoose = (userType) => {
    updateFetchingUser(true)

    axios.patch(`${config.API_URL}/api/type`, {userType}, {withCredentials: true,})
      .then((response) => {
        updateFetchingUser(false);
        updateUser(response.data);
        updateRedirect("profile")
        
      }).catch(() => {
        console.log("Edit project failed");
        updateFetchingUser(false)
      });
  }

  const handleDeleteProject = (projectId) => {
    axios
      .delete(`${config.API_URL}/api/project/${projectId}`, {
        withCredentials: true,
      })
      .then(() => {
        let filteredProject = projects.filter((project) => {
        return project._id !== projectId
        })
        updateProject(filteredProject);
        updateProfileRedirect(true)
      }).catch((err) => {
        console.log('Delete failed', err)
      });
  };

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

  const handleFollow = (follow) => {
    axios.patch(`${config.API_URL}/api/follow`, {follow}, {withCredentials: true,})
    .then((response) => {
      console.log(response)
      updateUser(response.data);
      
    }).catch(() => {
      console.log("Edit project failed");

    });
  }

  const handleUnfollow = (unfollow) => {
    console.log(unfollow)
    axios.patch(`${config.API_URL}/api/unfollow`, {unfollow}, {withCredentials: true,})
    .then((response) => {
      console.log(response)
      updateUser(response.data);
      
    }).catch(() => {
      console.log("Edit project failed");

    });
  }


  if(fetchingUser){
    return <h1>Loading</h1>
  }


  return (
    <div className="App">
      <NavBar onLogout={handleLogout} user={user} />
      <Switch>
        <Route exact path="/" render={(routeProps) => {
          return <Home user={user} {...routeProps} />
        }} />
        <Route exact path='/userslist' render={(routeProps) => {
              return <UserList users={users} user={user}  {...routeProps}  />
            }} />
        <Route
          path="/signup"
          render={(routeProps) => {
            return (
              <Signup
                error={error}
                onSubmit={handleSignup}
                onGoogleFailure={handleGoogleFailure}
                onGoogleSuccess={handleGoogleSuccess}
                onLinkedInSuccess={handleLinkedInSuccess}
                onLinkedInFailure={handleLinkedInFailure}
                {...routeProps}
              />
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
            return <Profile user={user} projects={projects} allUsers={users} {...routeProps} />;
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
                onDelete={handleDeleteUser}
                onChange={handleChangeUser}
                {...routeProps}
              />
            );
          }}
        />
         <Route
          exact
          path="/security"
          render={(routeProps) => {
            return (
              <AccountForm
                onEdit={handleSecurity}
                loggedInUser={user}
                fetchingUser={fetchUser}
                onChange={handleChangeUser}
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
            return <ProjectDetails projects={projects} user={user} allUser={users} onDelete={handleDeleteProject} {...routeProps} />;
          }}
        />
        <Route
          exact
          path="/project-edit/:id"
          render={(routeProps) => {
            return <EditProject onEdit={handleEditProject} projects={projects} {...routeProps} />;
          }}
        />
        <Route
          path="/chat/:chatId"
          render={(routeProps) => {
            return <ChatPage user={user} {...routeProps} />;
          }}
        />
        <Route
          exact
          path="/user/:id"
          render={(routeProps) => {
            return <UserProfile projects={projects} loggedInUser={user} onFollow={handleFollow} onUnfollow={handleUnfollow} {...routeProps} />;
          }}
        />
        <Route
          exact
          path="/choice-page"
          render={(routeProps) => {
            return <ChoicePage onChoose={handlOnChoose} {...routeProps} />;
          }}
        />
      </Switch>
    </div>
  );
}

export default withRouter(App);
