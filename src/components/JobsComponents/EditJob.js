import React from 'react'
import { useEffect, useState } from "react";
import { Grid, Container, Divider, TextField } from '@material-ui/core';
import '../../AddProject.css'
import MultipleSelect from '../MultipleSelectLanguage'
import MiniNavBar from "../MiniNavBar";

function EditJob(props) {

    const { onEdit, jobs }  = props

    let jobId = props.match.params.id

    const showPreview = (event) => {
        if(event.target.files.length > 0){
            let src = URL.createObjectURL(event.target.files[0]);
            let preview = document.getElementById("file-ip-prev");
            preview.src = src;;
            preview.style.display = "block";
        }
    }

    if (!jobs) {
        <h1>Loading</h1>
    }

    let filteredJobs = jobs.filter((e) => {
        return jobId == e._id
    })

    let singleJob = filteredJobs[0]

    return (
        <>
        <MiniNavBar />
        <Container className={"center"} style={{ width: "80%" }} fixed >
            <Grid className="centerBlock" container spacing={2}>
                <h1>Update your Project</h1>
                <form onSubmit={(e) => onEdit(e, jobId)}>
                    <div className="centerGrid">
                    <Grid className="imgDisplay" item xs={6}>
                        <div className="centerImg">
                            <img id="file-ip-prev"/>
                        </div>
                        <div className="inputUpload">
                        <label for="file-ip">Upload Image</label>
                        <input onChange={showPreview} name="image" id="file-ip" type="file" accept="image/jpeg, image/png" />
                        </div>
                      
                    </Grid>
                    <Grid className="infoGrid" item xs={6}>
                        <div className="labelLigne">
                        <label for="title">Title</label>
                        <input className="inputAdd"  name="title" id="title" type="text" placeholder="Job title" defaultValue={singleJob.title} />
                        <label for="location">Location</label>
                        <input  className="inputAdd" name="location" id="location" type="text" placeholder="Job location" />
                        <label for="type">Type</label>
                        <input className="inputAdd" name="type" id="type" type="text" placeholder="Enter type" defaultValue={singleJob.type} />
                        <label for="type">Languages</label>
                        <MultipleSelect className="languages-input" />
                        <label for="description">Description</label>
                        <textarea style={{outlineColor: "#230C0F"}} name="description" id="description" type="text" placeholder="Project description" defaultValue={singleJob.description} />
                        <div className="urlgit-btn-padding">
                        <button type="submit" className="btn-add-project">Save</button>
                        </div>
                        </div>
                    </Grid>
                    </div>
                    
                </form>
            </Grid>
        </Container>
        </>
    )
}

export default EditJob
