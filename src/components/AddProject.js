import React from 'react'
import { Grid, Container, Divider, TextField } from '@material-ui/core';
import '../AddProject.css'
import MultipleSelect from './MultipleSelectLanguage'
import MiniNavBar from "./MiniNavBar";

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

    let languages = ["Python", "Java", "JavaScript", "Go", "Ruby", "Dart", "PHP", "CSS", "HTML", "C++", "SQL", "MongoDB", "Angular", "React", "Vue", "Jquery", "TypeScript", "Unity"]
    let random = languages.sort(() => .5 - Math.random()).slice(0,7)

    console.log(random)


    return (
        <>
        <MiniNavBar />
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
                    <Divider />
                    <Grid className="infoGrid" item xs={6}>
                        <div className="labelLigne">
                        <label for="title">Title</label>
                        <input  className="inputAdd" name="title" id="title" type="text" placeholder="Project title" />
                        <label for="type">Type</label>
                        <input  className="inputAdd" name="type" id="type" type="text" placeholder="Type of project" />
                        <label for="type">Languages</label>
                        <MultipleSelect className="languages-input" />
                        <label  for="description">Description</label>
                        <textarea style={{outlineColor: "#230C0F"}} name="description" id="description" type="text" placeholder="Project description" />
                        <TextField name="urlProject" id="standard-basic" label="Url project" />
                        <TextField  name="urlGit" id="standard-basic" label="Url git" />
                        <div className="urlgit-btn-padding">
                        <button className="btn-add-project" type="submit">ADD PROJECT</button>
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

export default AddProject