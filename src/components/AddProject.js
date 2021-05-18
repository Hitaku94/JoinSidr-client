import React from 'react'
import { useEffect, useState } from "react";
import { Grid, Container, Divider } from '@material-ui/core';
import '../AddProject.css'

function AddProject(props) {
    const { onAdd } = props

    const showPreview = (event) => {
        if(event.target.files.length > 0){
            let src = URL.createObjectURL(event.target.files[0]);
            let preview = document.getElementById("file-ip-prev");
            preview.src = src;;
            preview.style.display = "block";
        }
    }

    /*const [disabled, updateDisabled] = useState(true)

    

    const handleChange = (e) => {
        if (e.target.value !== "") {
            updateDisabled(false)
        }
        else {
            updateDisabled(true)
        }
    }*/


    return (
        <Container className={"center"} style={{ width: "80%" }} fixed >
            <Grid className="centerBlock" container spacing={2}>
                <h1>Upload your project</h1>
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
                    <Grid className="infoGrid" item xs={6}>
                        <div className="labelLigne">
                        <label for="title">Title</label>
                        <input  name="title" id="title" type="text" placeholder="Project title" />
                        <label for="type">Type</label>
                        <input  name="type" id="type" type="text" placeholder="Enter type" />
                        <label for="description">Description</label>
                        <textarea name="description" id="description" type="text" placeholder="Project description" />
                        <div>
                        <button type="submit">Add project</button>
                        </div>
                        </div>
                    </Grid>
                    </div>
                    
                </form>
            </Grid>
        </Container>
    )
}

export default AddProject