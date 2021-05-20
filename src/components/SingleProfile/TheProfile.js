import React from 'react'
import "./TheProfile.css"
import axios from 'axios';
import { useEffect, useState } from "react";
import config from '../../config'
import { Link } from 'react-router-dom'
import { Paper, Grid } from '@material-ui/core';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import MiniNavBar from "../MiniNavBar";

function TheProfile(props) {

    const [user, updateUser] = useState(null)
   
    const { projects, onFollow, loggedInUser, onUnfollow, allUsers } = props

    useEffect(() => {
        let userId = props.match.params.id
        console.log(props.match.params)
        axios.get(`${config.API_URL}/api/user/${userId}`, { withCredentials: true })
            .then((response) => {
                updateUser(response.data)
            })
            .catch(() => {
                console.log("Detail fetch failed")
            })
    }, [])


    if (!user) {
        return <h1>Loading</h1>
    }

    if (!projects) {
        return <p>Loading . . .</p>
    }

    let filteredProject = projects.filter((e) => {
        return e.user._id == user._id
    })

    let followers = 0;
    allUsers.forEach((e) => {
        if (e.follow.includes(user._id)) {
            followers++
        }
    })

    let post = 0;
    projects.forEach((e) => {
        if (e.user._id == user._id) {
            post++
        }
    })

    return (
        <>
         
    <MiniNavBar />
            <div className="upper-container">

            </div>
            <div className="container">
                <main>
                    <div className="row">
                        <div className="left col-lg-4">
                            <div className="photo-left">
                                <img className="photo" src={user.profilePic} />
                            </div>
                            <h4 className="name">{user.username}</h4>
                            <div>
                            <LocationOnIcon style={{width: 20}}/>
                            <p className="info">{user.country}</p>
                            </div>
                            <p className="info">{user.experience}</p>
                            <p className="info">{user.email}</p>
                            <div className="skills-row">
                                {
                                    user.skills.map((e) => {
                                        return <span>{e}</span>
                                    })
                                }
                            </div>
                            <div className="stats row">
                                <div className="stat col-xs-4">
                                    <p className="number-stat">{followers}</p>
                                    <p className="desc-stat">Followers</p>
                                </div>
                                <div className="stat col-xs-4">
                                    <p className="number-stat">{user.follow.length}</p>
                                    <p className="desc-stat">Following</p>
                                </div>
                                <div className="stat col-xs-4" >
                                    <p className="number-stat">{post}</p>
                                    <p className="desc-stat">Uploads</p>
                                </div>
                            </div>
                            <p className="desc">{user.description}</p>
                            <div className="social">
                                <i className="fa fa-facebook-square" aria-hidden="true"></i>
                                <i className="fa fa-twitter-square" aria-hidden="true"></i>
                                <i className="fa fa-pinterest-square" aria-hidden="true"></i>
                                <i className="fa fa-tumblr-square" aria-hidden="true"></i>
                            </div>
                        </div>
                        <div className="right col-lg-8">
                            <div className="follow-div">
                                {
                                    loggedInUser.follow && loggedInUser.follow.includes(user._id)
                                        ? <button className="unfollow" onClick={() => onUnfollow(user._id)}>unfollow</button>
                                        : <button className="follow" onClick={() => onFollow(user._id)}>follow</button>
                                }
                                <Link className="msg-div" to="/userslist">Message</Link>
                            </div>

                            <ul className="nav">
                                <li>Gallery</li>
                                <li>Collections</li>
                                <li>Groups</li>
                                <li>About</li>
                            </ul>

                            <div className="row gallery">
                                {

                                    filteredProject.map((project) => {
                                        return (
                                           <>
                                           <Link className="link" to={`/project/${project._id}`}>
                                            <div className="col-md-4">
                                                <img src={project.image} />
                                            </div>
                                            </Link>
                                            
                                        </>
                                        )
                                    })
                                }
                                <div class="col-md-4">
             <img src="https://images.pexels.com/photos/113338/pexels-photo-113338.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260"/>
          </div>
          <div class="col-md-4">
             <img src="https://images.pexels.com/photos/5049/forest-trees-fog-foggy.jpg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260"/>
          </div>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        </>
    )
}

export default TheProfile