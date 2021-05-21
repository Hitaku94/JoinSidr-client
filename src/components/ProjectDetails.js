import React from 'react';
import axios from 'axios';
import { useEffect, useState } from "react";
import config from "../config";
import { Grid, Container, Divider } from '@material-ui/core';
import { Link } from 'react-router-dom'
import MiniNavBar from "./MiniNavBar";
import '../ProjectDetails.css'
import GitHubIcon from '@material-ui/icons/GitHub';
import LinkIcon from '@material-ui/icons/Link';

function ProjectDetails(props) {

    const { projects, onDelete, allUser, user } = props

    const [project, updateProject] = useState(null)

    const fetchProject = () => {
        let projectId = props.match.params.id
        axios.get(`${config.API_URL}/api/project/${projectId}`, { withCredentials: true })
            .then((response) => {
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
                                        <span><Link className="linkname" to={`/profile`}>{project.user.username}</Link></span>, <span>{project.date}</span> <span>{project.user.country}</span>
                                    </div>
                                </>
                                : <>
                                <Link className="link" to={`/user/${project.user._id}`}>
                                    <img className="profilePic" src={project.user.profilePic} alt={project.user.username} />
                                </Link>
                                    <div className="infoTitleDetail">
                                        <h2>{project.title}</h2>
                                        <span><Link className="linkname" to={`/user/${project.user._id}`}>{project.user.username}</Link></span>, <span>{project.date}</span> <span>{project.user.country}</span>
                                    </div>
                                </>
                        }
                    </Grid>
                    <Grid item className="imageBox-item"  xs={12}>
                        <img className="image" src={project.image} alt={project.title} />
                    </Grid>

                    <div className="languages-loop">
                        {
                            project.languages.map((e) => {
                                return <span className="languages-margin">{e}</span>
                            })
                        }
                    </div>
                    <Grid style={{paddingTop: 0}}  item xs={12}>
                        <h3>Description</h3>
                        <p>{project.description}</p>
                        <Divider className="desc-project-detail"/>
                    </Grid>
                    <div className="url-project-detail">
                        <a href={project.urlGit} className="url-project-git"><GitHubIcon /><p className="space-url">GitHub link</p></a>
                    <div className="url-project-git">
                    <a href={project.urlProject} className="url-project-git"><LinkIcon /><p className="space-url">Deploy Link</p></a>
                        </div>
                        
                    </div>
                   



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

            <Container className="containerBottom" style={{ width: "80%" }} fixed >
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
