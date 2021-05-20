import React, { useEffect, useState } from "react";
import { Switch, Route, withRouter} from "react-router-dom";
import {
  Home,
  NavBar,
  Profile,
  Signin,
  Signup,
  AddProject,
} from "./components";
import ChatPage from "./components/chatPages/ChatPage";
import { LinkedInPopUp } from "react-linkedin-login-oauth2";
import UserList from "./components/chatPages/UserList";
import Settings from "./components/Settings";
import axios from "axios";
import config from "./config";
import Trends from "./components/Trends";
import ProjectDetails from "./components/ProjectDetails";
import EditProject from "./components/EditProject";
import ChoicePage from "./components/ChoicePage";
import AccountForm from "./components/AccountForm"
import TheProfile from "./components/SingleProfile/TheProfile";
import JobsList from "./components/JobsComponents/JobsList";
import JobDetails from "./components/JobsComponents/JobDetails";
import EditJob from "./components/JobsComponents/EditJob";
import AddJob from "./components/JobsComponents/AddJob";
import NotFound from "./components/externalComponents/lottie/NotFound"
import AboutPage from "./components/AboutPage";
import FollowProject from "./components/FollowProject";
import FollowingList from "./components/FollowingList";
import './App.css'

function App(props) {

  // UseState

  const [user, updateUser] = useState(null);
  const [users, updateUsers] = useState([]);
  const [projects, updateProject] = useState([]);
  const [jobs, updateJob] = useState([]);
  const [filteredProjects, updateFilteredProjects] = useState([])
  const [error, updateError] = useState(null);
  const [fetchingUser, updateFetchingUser] = useState(true);
  const [showLoading, updateShowloading] = useState(true);
  const [redirect, updateRedirect] = useState(null)
  const [profileRedirect, updateProfileRedirect] = useState(false)
  const [follow, updateFollow] = useState(false)
  const [likes, updateLikes] = useState(false)
  const [showNav, updateShowNav] = useState(true)

  
  //useEffect (COMPONENT DID MOUNT)

  useEffect(() => {
    
      fetchProjects();
      fetchUser();
      fetchUsers();
      fetchJobs()
    
  },[]);

  useEffect(() => {
    if (redirect === "signin") {
      props.history.push("/signin");
    } else if (redirect === "") {
      props.history.push("/");
    } else if (redirect === "afterSignIn") {
      if (!user.userType) {
        updateShowNav(false)
        props.history.push("/choice-page");
      } else {
        props.history.push("/profile");
      }
    } else if (redirect === "profile") {
      props.history.push("/profile");
    }
  }, [props.history, redirect]);

  useEffect(() => {
    if (profileRedirect == true) {
      props.history.push("/profile");
      updateProfileRedirect(false);
      
    }
  }, [profileRedirect]);

  useEffect(() => {
    if (follow == true) {
      updateFollow(false)
      fetchUsers()
    }
  })

    useEffect(() => {
      if(likes == true) {
        updateLikes(false)
        fetchProjects();
      }
    })



  // FETCH THE MODELS FROM DATABASE

  const fetchProjects = () => {
    axios
      .get(`${config.API_URL}/api/trends`, { withCredentials: true })
      .then((response) => {
        updateProject(response.data);
        updateFilteredProjects(response.data);
      })
      .catch((err) => {
        console.log("Fecthing failed");
      });
  }

  const fetchUser = ()=>{
    axios
      .get(`${config.API_URL}/api/profile`, { withCredentials: true })
      .then((response) => {
        updateUser(response.data);
        updateFetchingUser(false);
      })
      .catch((err) => {
        console.log("user not logged in");
        updateFetchingUser(false);
      });
  };

  const fetchUsers = () => {
    axios
      .get(`${config.API_URL}/api/users`, { withCredentials: true })
      .then((response) => {
        updateUsers(response.data);
      })
      .catch((err) => {
        console.log("user not logged in");
      });
  };

  const fetchJobs = () => {
    axios
    .get(`${config.API_URL}/api/jobList`, { withCredentials: true })
    .then((response) => {
      updateJob(response.data);
    })
    .catch((err) => {
      console.log("Fecthing failed");
    });
  }

   ////

  const handleChangeUser = (event) =>
    updateUser({
      ...user,
      [event.currentTarget.name]: event.currentTarget.value,
    });

  //HANDLE AUTH

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
        updateUser(response.data);
        updateRedirect("signin");
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
        updateRedirect("afterSignIn");
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
    
    axios
      .post(`${config.API_URL}/api/google/info`, newUser, {
        withCredentials: true,
      })
      .then((response) => {
        updateUser(response.data.data);
        updateError(null);
        updateShowloading(false);
        updateRedirect("afterSignIn");
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
        updateRedirect("afterSignIn");
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
        updateRedirect("");
        updateUser(null);
        
      })
      .catch((errorObj) => {
        updateError(errorObj.response.data);
      });
  };

  const handleEditSettings = (event) => {
    event.preventDefault();

    let description = event.target.description.value;
    let experience = event.target.experience.value;
    let available= event.target.available.value; 
    let workLocation= event.target.workLocation.value; 
    let linkedinUrl = event.target.linkedinUrl.value;
    let githubUrl = event.target.githubUrl.value;
    let skills = event.target.skills.value;

    if (event.target.profilePic.files.length == 0) {
      axios
        .patch(
          `${config.API_URL}/api/settings`,
          { description, experience,available,workLocation,linkedinUrl,githubUrl, skills },
          {
            withCredentials: true,
          }
        )
        .then((response) => {
          updateUser(response.data);
          updateProfileRedirect(true)
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
              description,
              experience,
              profilePic: response.data.image,
              available,
              workLocation,
              linkedinUrl,
              githubUrl,
              skills,
            },
            {
              withCredentials: true,
            }
          );
        })
        .then((response) => {
          updateUser(response.data);
          updateProfileRedirect(true)
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
          updateProfileRedirect(true)
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

  // HANDLES FOR PROJECTS

  const handleCreateProject = (e) => {
    e.preventDefault();
    let title = e.target.title.value;
    let type = e.target.type.value;
    let description = e.target.description.value;
    let image = e.target.image.files[0];
    let urlProject = e.target.urlProject.value;
    let urlGit = e.target.urlGit.value;
    let languages = e.target.languages.value

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
            urlProject: urlProject,
            urlGit: urlGit,
            languages: languages,
          },
          { withCredentials: true }
        );
      })
      .then((response) => {
        updateProject([response.data, ...projects]);
        updateFilteredProjects([response.data, ...filteredProjects]);
        updateProfileRedirect(true);
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
    let urlProject = e.target.urlProject.value;
    let urlGit = e.target.urlGit.value;
    let languages = e.target.languages.value

    if (e.target.image.files.length == 0) {
      axios.patch(
        `${config.API_URL}/api/project/${projectId}`, 
        {
          title: title,
          type: type,
          description: description,
          urlProject: urlProject,
          urlGit: urlGit,
          languages: languages,
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
            urlProject: urlProject,
            urlGit: urlGit,
            languages: languages,
          },
          { withCredentials: true }
        )
      })
        .then((response) => {
          let clonedProjects = projects.map((e) => {
            if (projectId == e._id) {
              return response.data;
            } else {
              return e;
            }
          });
          updateProject(clonedProjects);
          updateProfileRedirect(true);
        })
        .catch(() => {
          console.log("Edit project failed");
        });
      }
    }

  const handlOnChoose = (userType) => {
    updateFetchingUser(true);
    updateShowNav(true)

    axios
      .patch(
        `${config.API_URL}/api/type`,
        { userType },
        { withCredentials: true }
      )
      .then((response) => {
        updateFetchingUser(false);
        updateUser(response.data);
        updateRedirect("profile");
      })
      .catch(() => {
        console.log("Edit project failed");
        updateFetchingUser(false);
      });
  };

  const handleDeleteProject = (projectId) => {
    axios
      .delete(`${config.API_URL}/api/project/${projectId}`, {
        withCredentials: true,
      })
      .then(() => {
        let filteredProject = projects.filter((project) => {
          return project._id !== projectId;
        });
        updateProject(filteredProject);
        updateProfileRedirect(true);
      })
      .catch((err) => {
        console.log("Delete failed", err);
      });
  };

  // HANDLE FOR SEARCH

  const handleSearch = (e) => {

    let input = e.target.value;
    let filteredProjects = projects.filter((singleProject) => {

      return singleProject.title.toLowerCase().includes(input.toLowerCase());
    });
    updateFilteredProjects(filteredProjects);
  };

  // HANDLES FOR FOLLOWING

  const handleFollow = (follow) => {
    axios
      .patch(
        `${config.API_URL}/api/follow`,
        { follow },
        { withCredentials: true }
      )
      .then((response) => {
        let allUsersArr = users.map((e) => {
          //TODO: CHANGE THIS LATER
          if (e._id == follow && response.data) {
            return response.data
          } else {
            return e
          }
        })

        updateUsers(allUsersArr);
        updateUser(response.data);
        updateFollow(true)
      })
      .catch(() => {
        console.log("Edit project failed");
      });
  };

  const handleUnfollow = (unfollow) => {
    axios.patch(`${config.API_URL}/api/unfollow`, {unfollow}, {withCredentials: true,})
    .then((response) => {
      let allUsersArr = users.map((e) => {
        if (e._id == unfollow) {
          return response.data
        } else {
          return e
        }
      })
      updateUsers(allUsersArr);
      updateUser(response.data);
      updateFollow(true)
      
    }).catch(() => {
      console.log("Edit project failed");

    });
  }

  // HANDLES FOR JOBS

  const handleCreateJob = (e) => {
    e.preventDefault();
    let title = e.target.title.value;
    let type = e.target.type.value;
    let description = e.target.description.value;
    let image = e.target.image.files[0];
    let languages = e.target.languages.value
    let location = e.target.location.value

    let formData = new FormData();
    formData.append("imageUrl", image);

    axios
      .post(`${config.API_URL}/api/upload`, formData)
      .then((response) => {
        return axios.post(
          `${config.API_URL}/api/job-create`,
          {
            title: title,
            type: type,
            description: description,
            image: response.data.image,
            languages: languages,
            location: location,
          },
          { withCredentials: true }
        );
      })
      .then((response) => {
        updateJob([response.data, ...jobs]);
        updateProfileRedirect(true)
      })
      .catch(() => {
        console.log("Image upload failed");
      });
  };

  const handleEditJob = (e, jobId) => {
    e.preventDefault();

    let title = e.target.title.value;
    let type = e.target.type.value;
    let description = e.target.description.value;
    let languages = e.target.languages.value
    let location = e.target.location.value

    if (e.target.image.files.length == 0) {
      axios.patch(
        `${config.API_URL}/api/job/${jobId}`, 
        {
          title: title,
          type: type,
          description: description,
          languages: languages,
          location: location,
        },
         {withCredentials: true,})
    .then((response) => {
      
      let clonedJobs = jobs.map((e) => {
        if (jobId == e._id) {
          return response.data
        }
        else {
          return e
        }
      }) 
      updateJob(clonedJobs);
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
          `${config.API_URL}/api/job/${jobId}`,
          {
            title: title,
            type: type,
            description: description,
            image: response.data.image,
            languages: languages,
            location: location,
          },
          { withCredentials: true }
        );
      })
      .then((response) => {
        let clonedJobs = jobs.map((e) => {
          if (jobId == e._id) {
            return response.data
          }
          else {
            return e
          }
        }) 
        updateJob(clonedJobs);
        updateProfileRedirect(true)
      }) 
      .catch(() => {
        console.log("Edit project failed");
      });
    }
    
  };

  const handleDeleteJob = (jobId) => {
    axios
      .delete(`${config.API_URL}/api/job/${jobId}`, {
        withCredentials: true,
      })
      .then(() => {
        let filteredJob = jobs.filter((job) => {
        return job._id !== jobId
        })
        updateJob(filteredJob);
        updateProfileRedirect(true)
      }).catch((err) => {
        console.log('Delete failed', err)
      });
  };

  // HANDLES FOR LIKES

  const handleLikes = (projectId) => {

    axios.patch(`${config.API_URL}/api/like/${projectId}`, {like: user._id}, {withCredentials: true})
    .then((response) => {
     let projectsArr = projects.map((e) => {
        if (e._id == projectId) {
          return response.data
        } else {
          return e
        }
      })
   
      updateProject(projectsArr);
      updateLikes(true)
      let filteredProjectsArr = filteredProjects.map((e) => {
        if (e._id == projectId) {
          return response.data
        } else {
          return e
        }
        
      })
  
      updateFilteredProjects(filteredProjectsArr)
    }).catch(() => {
      console.log("Edit project failed like");
      
    });
  }

  const handleUnlikes = (projectId) => {
    axios.patch(`${config.API_URL}/api/unlike/${projectId}`, {like: user._id}, {withCredentials: true,})
    .then((response) => {
      let projectsArr = projects.map((e) => {
        if (e._id == projectId) {
          return response.data
        } else {
          return e
        }
      })
     
      updateProject(projectsArr);
      updateLikes(true)
      let filteredProjectsArr = filteredProjects.map((e) => {
        if (e._id == projectId) {
          return response.data
        } else {
          return e
        }
        
      })
      
      updateFilteredProjects(filteredProjectsArr)
      updateLikes(true)
      
    }).catch(() => {
      console.log("Edit project failed unlike");

    });
  }

  if (fetchingUser) {
    return <h1>Loading</h1>;
  }

  return (
    <div className="App">
      {
        showNav == true
        ? <NavBar onLogout={handleLogout} user={user} />
        : <></>
}
      
      <Switch>
        <Route
          exact
          path="/"
          render={(routeProps) => {
            return <Home user={user} {...routeProps} />;
          }}
        />
        <Route
          exact
          path="/about"
          render={(routeProps) => {
            return <AboutPage {...routeProps} />;
          }}
        />
        <Route
          exact
          path="/userslist"
          render={(routeProps) => {
            return <UserList users={users} user={user} {...routeProps} />;
          }}
        />
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
              <Signin error={error} onSignIn={handleSignIn} onGoogleFailure={handleGoogleFailure}
                onGoogleSuccess={handleGoogleSuccess}
                onLinkedInSuccess={handleLinkedInSuccess}
                onLinkedInFailure={handleLinkedInFailure} {...routeProps} />
            );
          }}
        />
        <Route
          exact
          path="/profile"
          render={(routeProps) => {
            return <Profile user={user} projects={projects} jobs={jobs} allUsers={users} onLogout={handleLogout} {...routeProps} />;
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
                {...routeProps}
              />
            );
          }}
        />
        <Route exact path="/linkedin" component={LinkedInPopUp} />
        <Route
          exact
          path="/security"
          render={(routeProps) => {
            return (
              <AccountForm
                onEdit={handleSecurity}
                loggedInUser={user}
                onDelete={handleDeleteUser}
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
            return <Trends onSearch={handleSearch} projects={filteredProjects} user={user} likes={handleLikes} unlikes={handleUnlikes} {...routeProps} />;
          }}
        />
        <Route
          exact
          path="/project/:id"
          render={(routeProps) => {
            return (
              <ProjectDetails
                projects={projects}
                user={user}
                allUser={users}
                onDelete={handleDeleteProject}
                {...routeProps}
              />
            );
          }}
        />
        <Route
          exact
          path="/project-edit/:id"
          render={(routeProps) => {
            return (
              <EditProject
                onEdit={handleEditProject}
                projects={projects}
                {...routeProps}
              />
            );
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
            return <TheProfile projects={projects} loggedInUser={user} allUsers={users} onFollow={handleFollow} onUnfollow={handleUnfollow} {...routeProps} />;
          }}
        />
        <Route
          exact
          path="/choice-page"
          render={(routeProps) => {
            return <ChoicePage onChoose={handlOnChoose} {...routeProps} />;
          }}
        />
        {/*Route for Jobs*/}
        <Route
          exact
          path="/jobsList"
          render={(routeProps) => {
            return <JobsList jobs={jobs} {...routeProps} user={user} />;
          }}
        />
        <Route
          exact
          path="/job/:id"
          render={(routeProps) => {
            return <JobDetails jobs={jobs} user={user} allUser={users} onDelete={handleDeleteJob} {...routeProps} />;
          }}
        />
        <Route
          exact
          path="/job-edit/:id"
          render={(routeProps) => {
            return <EditJob onEdit={handleEditJob} jobs={jobs} {...routeProps} />;
          }}
        />
        <Route
          exact
          path="/job-create"
          render={(routeProps) => {
            return <AddJob onAdd={handleCreateJob} {...routeProps} />;
          }}
        />
        
         <Route
          exact
          path="/profile/collections"
          render={(routeProps) => {
            return <FollowProject user={user} projects={projects} jobs={jobs} allUsers={users} onLogout={handleLogout} {...routeProps} />;
          }}
        />
          <Route
          exact
          path="/profile/follow"
          render={(routeProps) => {
            return <FollowingList user={user} projects={projects} jobs={jobs} allUsers={users} onLogout={handleLogout} {...routeProps} />;
          }}
        />
        <Route component={NotFound} />
      </Switch>
    </div>
  );
}

export default withRouter(App);
