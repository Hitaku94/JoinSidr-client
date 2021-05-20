import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import { Grid, Container } from "@material-ui/core";
import SkillsDropdownList from "./externalComponents/SkillsDropdownList";
import RadioButtonAvailable from "./externalComponents/RadiobuttonAvailable";
import RadioButtonWork from "./externalComponents/RadiobuttonWork";

const Settings = (props) => {
  const { loggedInUser, onEdit } = props;
  const [user, updateUser] = useState(loggedInUser);
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
                <RadioButtonWork onChange={handleChangeUser} />
                <RadioButtonAvailable onChange={handleChangeUser} />
                <label for="description">Description</label>
                <TextField
                  name="description"
                  type="text"
                  onChange={handleChangeUser}
                  value={user.description}
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
                  <label>My Skills</label>
                  <SkillsDropdownList className="languages-input" />
                </div>
                <div id="users-links">
                <label for="linkedinUrl">Your Linkedin URL</label>
                <TextField
                  name="linkedinUrl"
                  type="text"
                  onChange={handleChangeUser}
                  value={user.linkedinUrl}
                />
                <label for="githubUrl">Your Github URL</label>
                <TextField
                  name="githubUrl"
                  type="text"
                  onChange={handleChangeUser}
                  value={user.githubUrl}
                />
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
