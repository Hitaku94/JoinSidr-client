import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import { Grid, Container } from "@material-ui/core";
import SkillsDrop from "./externalComponents/SkillsDropdownList";

const Settings = (props) => {
  const { loggedInUser, onEdit, selected } = props;
  const [user, updateUser]= useState(loggedInUser)
  const handleChangeUser = (event) =>
    updateUser({
      ...user,
      [event.currentTarget.name]: event.currentTarget.value,
    });

  const showPreview = (event) => {
    if (event.target.files.length > 0) {
      let src = URL.createObjectURL(event.target.files[0]);
      let preview = document.getElementById("file-ip-prev");
      preview.src = src;
      preview.style.display = "block";
    }
  };

  if (!loggedInUser) {
    return <h1>Loading</h1>;
  }

  console.log(props);
  return (
    <Container className={"center"} style={{ width: "80%" }} fixed>
      <Grid className="centerBlock" container spacing={2}>
        <h1>Hello @{loggedInUser.username}</h1>
        <h3>Here you can edit your profile.</h3>
        <form
          onSubmit={onEdit}
          className="form-center"
          noValidate
          autoComplete="off"
        >
          <div className="centerGrid">
            <Grid className="imgDisplay" item xs={6}>
              <div className="centerImg">
                <img id="file-ip-prev" />
              </div>
              <div className="inputUpload">
                <label for="file-ip">Upload Image</label>
                <input
                  onChange={showPreview}
                  name="profilePic"
                  id="file-ip"
                  type="file"
                  accept="image/jpeg, image/png"
                />
              </div>
            </Grid>
            <Grid className="infoGrid" item xs={6}>
              <div className="labelLigne">
              <label for="country">Username</label>
                <TextField
                  name="username"
                  type="text"
                  onChange={handleChangeUser}
                  value={user.username}
                />
                <label for="description">Description</label>
                <TextField
                  name="description"
                  type="text"
                  onChange={handleChangeUser}
                  value={user.description}
                />
                <label for="country">Country</label>
                <TextField
                  name="country"
                  type="text"
                  onChange={handleChangeUser}
                  value={user.country}
                />
                <div id="experience">
                  <label
                    for="experience"
                    className="form-label"
                    id="marginText"
                  >
                    My experience
                  </label>
                  <select
                    name="experience"
                    id="experience"
                    className="form-select"
                  >
                    <option value="Student">Student</option>
                    <option value="Junior 0-2 years of experience">
                      Junior 0-2 years of experience
                    </option>
                    <option value="Senior 2+ years">Senior 2+ years</option>
                  </select>
                </div>
                <div id="skills">
                <SkillsDrop value={selected} onChange={handleChangeUser} name="skills"/>
                </div>

                
              </div>  
              <Button className="my-btn" type="submit" variant="contained">
                Save
              </Button>
            </Grid>
          </div>
        </form>
      </Grid>
    </Container>
  );
};
export default Settings;
