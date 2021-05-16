import React, { useState } from "react";
import { Link } from "react-router-dom";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";

const Settings = (props) => {
  const { loggedInUser, onEdit, fetchingUser} = props;
  const [user, updateUser]= useState(loggedInUser)
  const handleChangeUser = (event) =>
  updateUser({
    ...user,
    [event.currentTarget.name]: event.currentTarget.value,
  });
  const { loggedInUser, onEdit, onChange} = props;

  if (!loggedInUser){
    return <h1>Loading</h1>
}

  console.log(props);
  return (
    <div className="container">
      <div className="header">
        <h1>Hello @{loggedInUser.username}</h1>
        <h3>Here you can edit your profile.</h3>
      </div>
      <form
        onSubmit={onEdit}
        className="form-center"
        noValidate
        autoComplete="off"
      >
      <input name="profilePic" type="file" accept="image/jpeg, image/png" />
        <TextField
          name="username"
          type="text"
          variant="filled"
          label="username"
          onChange={handleChangeUser}
          value={user.username}
        />
        <TextField
          name="description"
          type="text"
          variant="filled"
          label="description"
          onChange={handleChangeUser}
          value={user.description}
        />
        <TextField
          name="country"
          type="text"
          variant="filled"
          label="Country"
          onChange={handleChangeUser}
          value={user.country}
        />
        <div id="experience">
          <label for="experience" class="form-label" id="marginText">
            My experience
          </label>
          <select
            name="experience"
            id="experience"
            class="form-select"
          >
            <option value="Student">Student</option>
            <option value="Junior 0-2 years of experience">
              Junior 0-2 years of experience
            </option>
            <option value="Senior 2+ years">Senior 2+ years</option>
          </select>
        </div>

        <div id="skills">
          <label for="skills" class="form-label" id="marginText">
            My Skills
          </label>
          <select
            name="skills"
            id="skills"
            class="form-select"
          >
            <option value="HTML">HTML</option>
            <option value="CSS">
              CSS
            </option>
            <option value="JavaScript">JavaScript</option>
            <option value="React">React</option>
            <option value="Angular">Angular</option>
            <option value="other">Other</option>
          </select>
        </div>



        <Button className="my-btn" type="submit" variant="contained">
          Save
        </Button>
      </form>
    </div>
  );
};
export default Settings;
