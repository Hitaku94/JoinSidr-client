import React from 'react';
import axios from 'axios';
import { useEffect, useState } from "react";
import '../../ProjectDetails.css'
import config from "../../config";
import { Grid, Container, Divider } from '@material-ui/core';
import { Link } from 'react-router-dom'

function JobDetails(props) {

    const { jobs, onDelete, allUser, user } = props

    const [job, updateJob] = useState(null)

    const fetchJob = () => {
        let jobId = props.match.params.id
        axios.get(`${config.API_URL}/api/job/${jobId}`, { withCredentials: true })
            .then((response) => {
                console.log(response.data)
                updateJob(response.data)
            })
            .catch(() => {
                console.log("Detail fetch failed")
            })

    }

    useEffect(() => {
        fetchJob()
    }, [])

    useEffect(() => {

        if (!job || props.match.params.id != job._id) {
            fetchJob()
        }
    })

    if (!job) {
        return <h1>Loading</h1>
    }

    let jobUsers = jobs.filter((e) => {
        return e.user._id == user._id
    })

    let filteredJob = jobUsers.filter((e) => {
        return e._id != job._id
    })

    let filteredUsers = allUser.filter((e) => {
        return e._id == job.user._id
    })

    let singleUser = filteredUsers[0]

    return (
        <>
            <Container className={"projectDetailContainer"} style={{ width: "50%" }} fixed >
                <Grid className="Thebigger-upBox" container spacing={8}>
                    <Grid className="item" item xs={12}>
                        {
                            user._id == job.user._id
                                ? <>
                                    <Link className="link" to={`/profile`}>
                                        <img className="profilePic" src={job.user.profilePic} alt={job.user.username} />
                                    </Link>
                                    <div className="infoTitleDetail">
                                        <h2>{job.title}</h2>
                                        <span><Link className="link" to={`/profile`}>{job.user.username}</Link></span>, <span>{job.date}</span> <span>{job.user.country}</span>
                                    </div>
                                </>
                                : <>
                                    <Link className="link" to={`/user/${job.user._id}`}>
                                        <img className="profilePic" src={job.user.profilePic} alt={job.user.username} />
                                    </Link>
                                    <div className="infoTitleDetail">
                                        <h2>{job.title}</h2>
                                        <span><Link className="link" to={`/user/${job.user._id}`}>{job.user.username}</Link></span>, <span>{job.date}</span> <span>{job.user.country}</span>
                                    </div>
                                </>
                        }
                    </Grid>
                    <Grid className="imageBox-item" item xs={12}>
                        <img className="image" src={job.image} alt={job.title} />

                    </Grid>
                    <div>
                        {
                            job.languages.map((e) => {
                                return <span>{e}</span>
                            })
                        }
                    </div>
                    <Grid item xs={12}>
                        <Divider />
                        <h3>Description</h3>
                        <p>{job.description}</p>
                    </Grid>



                </Grid>
            </Container>
            {
                user._id == job.user._id
                    ? <div className="btnBoxDetail">
                        <Link className="editLink" to={`/job-edit/${job._id}`}>Edit</Link>
                        <button onClick={() => { onDelete(job._id) }} className="deleteBtn">Delete</button>
                    </div>
                    : <div></div>
            }
            <Container className={"containerBottom"} style={{ width: "80%" }} fixed >
                <Grid container spacing={8}>
                    <Grid className="padding-less" item xs={12}>
                        <div className="lineBox">
                            <span className="spanLine"></span>
                            {
                                user._id == job.user._id
                                ? <h2 className="moreProject">More Jobs by <Link className="link" to={`/profile`}><span className="profileLink">{job.user.username}</span></Link></h2>
                                : <h2 className="moreProject">More Jobs by <Link className="link" to={`/user/${job.user._id}`}><span className="profileLink">{job.user.username}</span></Link></h2>
                            }
                           
                            <span className="spanLine"></span>
                        </div>
                    </Grid>
                    <div className="right col-lg-8">
                        <div className="row gallery">
                            {

                                filteredJob.map((job) => {
                                    return (
                                        <>
                                            <Link className="link" to={`/job/${job._id}`}>
                                                <div className="col-md-4">
                                                    <img src={job.image} />
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

export default JobDetails