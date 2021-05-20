import React from 'react'
import axios from 'axios';
import { useEffect, useState } from "react";
import config from "../config";
import { Link } from 'react-router-dom'
import { Paper, Grid } from '@material-ui/core';

function UserProfile(props) {

    const [user, updateUser] = useState(null)

    const { projects, onFollow, loggedInUser, onUnfollow } = props

    useEffect(() => {
        let userId = props.match.params.id
        console.log(props.match)
        axios.get(`${config.API_URL}/api/user/${userId}`, { withCredentials: true })
            .then((response) => {
                console.log(response.data)
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

    return (
        <div>
        <div>
            <img src={user.profilePic} alt={user.username} />
            <h1>{user.username}</h1>
            <p>{user.description}</p>
        </div>
        <div>
            <h2>projects</h2>
            {

filteredProject.map((project) => {
    return (
        <>
            <Grid key={project._id} className="box" item xs={12} sm={12} md={6} lg={4}>



                <div className="imgBox">

                    <img className="imgProject" src={project.image} alt={project.image} />

                </div>
                <Link className="link" to={`/project/${project._id}`}>
                    <div className="details">

                        <div className="content">
                           
                            <h2>{project.title}</h2>

                        </div>

                    </div>
                </Link>

            </Grid>
        </>

    )
}

)}
        </div>
        </div>
    )
}

export default UserProfile
