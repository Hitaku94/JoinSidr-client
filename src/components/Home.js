import React from 'react';
import { Grid, Button } from '@material-ui/core';
import { Redirect } from "react";
import { Link } from 'react-router-dom'

function Home(props) {

    const { user } = props


    return (
        <>


            <Grid container direction="column" justify="center" alignItems="stretch">
                <Grid item xs={12} sm={6}>
                    <h1>Share your portfolio and Join the community</h1>
                </Grid>
                <Grid item xs={12}>
                    <p>Hello Yanis and Taka</p>
                </Grid>
                <Grid item xs={12}>
                    <Button variant="contained" color="primary">
                        SignUp
                    </Button>
                    <Link to="/thetesting">test</Link>
                </Grid>
            </Grid>
        </>
    )
}

export default Home
