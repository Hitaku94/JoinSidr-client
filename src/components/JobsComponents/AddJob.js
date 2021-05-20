import React from 'react'
import { useEffect, useState } from "react";
import { Grid, Container, Divider, TextField } from '@material-ui/core';
import '../../AddProject.css'
import MultipleSelect from '../MultipleSelectLanguage'
import MiniNavBar from "../MiniNavBar";

function AddJob(props) {
    const { onAdd } = props

    const showPreview = (event) => {
        if(event.target.files.length > 0){
            let src = URL.createObjectURL(event.target.files[0]);
            let preview = document.getElementById("file-ip-prev");
            preview.src = src;;
            preview.style.display = "block";
        }
    }

    let languages = ["Python", "Java", "JavaScript", "Go", "Ruby", "Dart", "PHP", "CSS", "HTML", "C++", "SQL", "MongoDB", "Angular", "React", "Vue", "Jquery", "TypeScript", "Unity"]
    let random = languages.sort(() => .5 - Math.random()).slice(0,7)

    return (
        <>
        <MiniNavBar />
        <Container className={"center"} style={{ width: "80%" }} fixed >
            <Grid className="centerBlock" container spacing={2}>
                <h1>Upload your Job</h1>
                <form onSubmit={onAdd}>
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
                    <Divider />
                    <Grid className="infoGrid" item xs={6}>
                        <div className="labelLigne">
                        <label for="title">Title</label>
                        <input  className="inputAdd" name="title" id="title" type="text" placeholder="Job title" />
                        <label for="location">Location</label>
                        <input  className="inputAdd" name="location" id="location" type="text" placeholder="Job location" />
                        <label for="type">Type</label>
                        <input  className="inputAdd" name="type" id="type" type="text" placeholder="Type of job" />
                        <label for="languages">Languages</label>
                        <MultipleSelect className="languages-input" />
                        <label for="description">Description</label>
                        <textarea name="description" id="description" type="text" placeholder="Job description" />
                        <div className="urlgit-btn-padding">
                        <button type="submit">Add Job</button>
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

export default AddJob