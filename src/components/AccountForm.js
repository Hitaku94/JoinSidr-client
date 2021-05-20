import React, { useState, useMemo } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import { Grid, Container } from "@material-ui/core";
import MiniNavBar from "./MiniNavBar";

import CountrySelector from "./externalComponents/CountrySelector";

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
                <label for="username">Username</label>
                  <TextField
                    name="username"
                    type="text"
                    onChange={handleChangeUser}
                    value={user.username}
                  />
                  <label for="password">Password</label>
                  <TextField
                    name="password"
                    type="password"
                    onChange={handleChangeUser}
                    value={user.password}
                  />
                  
                  
                  <label for="country">Country</label>
                  <CountrySelector  value={selected} name="country" onChange={handleChangeUser}/>
                
                  
                  </div>
                <Button className="my-btn" type="submit" variant="contained">
                  Save
                </Button>
              </Grid>
            </div>
          </form>
          <Button className="my-btn" onClick={onDelete} variant="contained">
            Delete your account
          </Button>
        </Grid>
      </Container>
      </>
    );
  };
  export default AccountForm;
  
