import React from 'react';
import axios from 'axios';
import { useEffect, useState } from "react";
import '../ProjectDetails.css'
import config from "../config";
import { Grid, Container, Divider } from '@material-ui/core';
import { Link } from 'react-router-dom'

function ProjectDetails(props) {

    const { projects, onDelete, allUser, user } = props

    const [project, updateProject] = useState(null)

    useEffect(() => {
        let projectId = props.match.params.id
        axios.get(`${config.API_URL}/api/project/${projectId}`, { withCredentials: true })
            .then((response) => {
                console.log(response.data)
                updateProject(response.data)
            })
            .catch(() => {
                console.log("Detail fetch failed")
            })

    }, [])


    let projectUsers = projects.filter((e) => {
        return e.user._id == user._id
    })

    let filteredProject = projectUsers.filter((e) => {
        return e._id != project._id
    })

    let filteredUsers = allUser.filter((e) => {
        return e._id == project.user._id
    })

    let singleUser = filteredUsers[0]

    console.log(singleUser)

    
    if (!project) {
        return <h1>Loading</h1>
    }

    return (
        <>
            <Container className={"container"} style={{ width: "50%" }} fixed >
                <Grid container spacing={8}>
                    <Grid className="item" item xs={12}>
                        <img className="profilePic" src={project.user.profilePic} alt={project.user.username} />
                        <div className="info">
                            <h2>{project.title}</h2>
                            <span><Link className="link" to={`/userProfile/${project.user._id}`}>{project.user.username}</Link></span>, <span>{project.date}</span> <span>{project.user.country}</span>
                        </div>
                    </Grid>
                    <Grid item xs={12}>
                        <img className="image" src={project.image} alt={project.title} />

                    </Grid>

                    <Grid item xs={12}>
                        <Divider />
                        <h3>Description</h3>
                        <p>{project.description}</p>
                    </Grid>
                    <div className="btnBoxDetail">
                        <Link className="editLink" to={`/project-edit/${project._id}`}>Edit</Link>
                        <button onClick={() => {onDelete(project._id)}} className="deleteBtn">Delete</button>
                    
                        </div>
                    

                </Grid>
            </Container>
            <Container className={"containerBottom"} style={{ width: "80%" }} fixed >
                <Grid container spacing={8}>
                <Grid item xs={12}>
                        <div className="lineBox">
                        <span className="spanLine"></span>
                        <h2 className="moreProject">More project by <Link className="link" to="/profile"><span className="profileLink">{project.user.username}</span></Link></h2>
                        <span className="spanLine"></span>
                        </div>
                    </Grid>
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
                </Grid>
            </Container>
        </>
    )
}

export default ProjectDetails
