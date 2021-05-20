import React from 'react';
import axios from 'axios';
import { useEffect, useState } from "react";
import '../ProjectDetails.css'
import config from "../config";
import { Grid, Container, Divider } from '@material-ui/core';
import { Link } from 'react-router-dom'
import MiniNavBar from "./MiniNavBar";

function ProjectDetails(props) {

    const { projects, onDelete, allUser, user } = props

    const [project, updateProject] = useState(null)

    const fetchProject = () => {
        let projectId = props.match.params.id
        axios.get(`${config.API_URL}/api/project/${projectId}`, { withCredentials: true })
            .then((response) => {
                console.log(response.data)
                updateProject(response.data)
            })
            .catch(() => {
                console.log("Detail fetch failed")
            })

    }

    useEffect(() => {
        fetchProject()
    }, [])

    useEffect(() => {
        console.log(project)

        if (!project || props.match.params.id != project._id) {
            fetchProject()
        }
    })

    if (!project) {
        return <h1>Loading</h1>
    }

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

    return (
        <>
        <MiniNavBar />
            <Container className={"projectDetailContainer"} style={{ width: "50%" }} fixed >
                <Grid className="Thebigger-upBox" container spacing={8}>
                    <Grid className="item" item xs={12}>
                        {
                            user._id == project.user._id
                                ? <>
                                <Link className="link" to={`/profile`}>
                                    <img className="profilePic" src={project.user.profilePic} alt={project.user.username} />
                                </Link>
                                    <div className="infoTitleDetail">
                                        <h2>{project.title}</h2>
                                        <span><Link className="link" to={`/profile`}>{project.user.username}</Link></span>, <span>{project.date}</span> <span>{project.user.country}</span>
                                    </div>
                                </>
                                : <>
                                <Link className="link" to={`/user/${project.user._id}`}>
                                    <img className="profilePic" src={project.user.profilePic} alt={project.user.username} />
                                </Link>
                                    <div className="infoTitleDetail">
                                        <h2>{project.title}</h2>
                                        <span><Link className="link" to={`/user/${project.user._id}`}>{project.user.username}</Link></span>, <span>{project.date}</span> <span>{project.user.country}</span>
                                    </div>
                                </>
                        }
                    </Grid>
                    <Grid className="imageBox-item" item xs={12}>
                        <img className="image" src={project.image} alt={project.title} />

                    </Grid>
                    <div>
                        {
                            project.languages.map((e) => {
                                return <span>{e}</span>
                            })
                        }
                    </div>
                    <div>
                        <p>{project.urlProject}</p>
                        <p>{project.urlGit}</p>
                    </div>
                    <Grid item xs={12}>
                        <Divider />
                        <h3>Description</h3>
                        <p>{project.description}</p>
                    </Grid>



                </Grid>
            </Container>
            {
                user._id == project.user._id
                    ? <div className="btnBoxDetail">
                        <Link className="editLink" to={`/project-edit/${project._id}`}>Edit</Link>
                        <button onClick={() => { onDelete(project._id) }} className="deleteBtn">Delete</button>
                    </div>
                    : <div></div>
            }

            <Container className={"containerBottom"} style={{ width: "80%" }} fixed >
                <Grid container spacing={8}>
                    <Grid className="padding-less" item xs={12}>
                        <div className="lineBox">
                            <span className="spanLine"></span>
                            {
                                user._id == project.user._id 
                                ? <h2 className="moreProject">More project by <Link className="link" to={`/profile`}><span className="profileLink">{project.user.username}</span></Link></h2>
                                : <h2 className="moreProject">More project by <Link className="link" to={`/user/${project.user._id}`}><span className="profileLink">{project.user.username}</span></Link></h2>
                            }
                            
                            <span className="spanLine"></span>
                        </div>
                    </Grid>
                    <div className="right col-lg-8">
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
                                }

                                )}
                        </div>
                    </div>
                </Grid>
            </Container>
        </>
    )
}

export default ProjectDetails
