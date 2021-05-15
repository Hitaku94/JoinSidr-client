import React from 'react';
import axios from 'axios';
import { useEffect, useState } from "react";
import '../ProjectDetails.css'
import config from "../config";
import {Grid, Container, Divider} from '@material-ui/core';

function ProjectDetails(props) {

    const [project, updateProject] = useState(null)

    useEffect(() => {
        let projectId = props.match.params.id
        console.log(props.match)
        axios.get(`${config.API_URL}/api/project/${projectId}`, {withCredentials: true})
            .then((response) => {
                console.log(response.data)
                updateProject(response.data)
            })
            .catch(() => {
                console.log("Detail fetch failed")
            })
    }, [])

    if (!project) {
        return <h1>Loading</h1>
    }

    return (
        <Container className={"container"} style={{width: "50%"}} fixed >
            <Grid container spacing={8}>
                <Grid className="item" item xs={12}>
                        <img src={project.user.profilePic} alt={project.user.username} />
                        <div className="info">
                            <h2>{project.title}</h2>
                            <span>{project.user.username}</span> <span>{project.date}</span> <span>{project.user.country}</span>
                        </div>   
                </Grid>
                <Grid  item xs={12}>
                    <img className="image" src={project.image} alt={project.title} />
                    
                </Grid>
                
                <Grid  item xs={12}>
                    <Divider />
                    <h3>Description</h3>
                    <p>{project.description}</p>
                </Grid>
                <Grid  item xs={12}>
                    <Divider />
                    <h2 className="moreProject">More project by {project.user.username}</h2>
                </Grid>
                <Grid item xs={6}>
                    
                <img className="image" src={project.image} alt={project.title} />
                </Grid>

            </Grid>
            </Container>
    )
}

export default ProjectDetails
