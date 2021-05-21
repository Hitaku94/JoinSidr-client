import React, { useState, useMemo } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import { Grid, Container } from "@material-ui/core";
import MiniNavBar from "./MiniNavBar";
import CountrySelector from "./externalComponents/CountrySelector";
import '../AddProject.css'


const AccountForm = (props) => {
    const { loggedInUser, onEdit, onDelete, selected } = props;
    const [user, updateUser] = useState(loggedInUser);
    const handleChangeUser = (event) =>
      updateUser({
        ...user,
        [event.currentTarget.name]: event.currentTarget.value,
      });
  
    if (!loggedInUser) {
      return <h1>Loading</h1>;
    }
  
    console.log(props);
    return (
      <>
      <MiniNavBar />
      <Container className={"center"} style={{ width: "80%" }} fixed>
        <Grid className="centerBlock" container spacing={2}>
          <h1>Hello @{loggedInUser.username}</h1>
          <h3>Manage your security</h3>
          <form
            onSubmit={onEdit}
            className="form-center"
            noValidate
            autoComplete="off"
          >
            <div className="centerGrid">
              
              <Grid className="infoGrid" item xs={12}>
                <div className="labelLigne">
                <label className="label-padding-account" for="username">Username</label>
                  <TextField
                    name="username"
                    type="text"
                    onChange={handleChangeUser}
                    value={user.username}
                  />
                  <label className="label-padding-account" for="password">Password</label>
                  <TextField
                    name="password"
                    type="password"
                    onChange={handleChangeUser}
                    value={user.password}
                  />
                  
                  
                  <label className="label-padding-account" for="country">Country</label>
                  <div className="country-selector" >
                  <CountrySelector  value={selected} name="country" onChange={handleChangeUser}/>
                  </div>
                  
                  </div>
                  <div className="account-save-btn">
                        <button className="btn-add-project" type="submit">Save</button>
                        </div>
              </Grid>
            </div>
          </form>
          <div className="urlgit-btn-padding">
          <button className="btn-delete-account" onClick={onDelete} >
            Delete your account
          </button>
          </div>
        </Grid>
      </Container>
      </>
    );
  };
  export default AccountForm;
  
