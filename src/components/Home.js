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
                <div id="top-section-home">
                <h1>JoinSidr to become a Workfluencer or find here your next WorkStar!</h1>
            <h2>Showcase your amazing work with our easy to use Online Portfolio Website</h2>
            <p>Our community brings together talents and recruiters! Join us and </p>
            <button>Get Started!</button>
            </div>
                </Grid>
                <Grid item xs={12}>
                <div id="middle-section home">
            <h3>For Web Developers</h3>
            <p>
                JoinSidr is a brand new community, allowing you to share your work, follow inspiring professionals, and get in touch with recruiters from your field. Our passion and our devotion
                make us believe in helping each other and inspiring the newcomers in the Web Development field. Either you are a brand new developer or an experienced one our website aims to give you an intuitive
                solution that further elevate your experience.
            </p>
            </div>  
                </Grid>
                <Grid item xs={12}>
                <div id="bottom-section home">
            <h3>For Recruiters</h3>
            <p>
                JoinSidr is also a way for recruiters to find their next talent. From newcomers to experienced Web Developers, you will find an amazing talent pool of web developers ready to 
                jump on a new adventure by your side. With our web application 
            </p>
            </div>
                </Grid>
            </Grid>
        </>
    )
}

export default Home
