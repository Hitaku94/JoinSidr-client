import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import { Paper, Grid } from '@material-ui/core';


const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    paper: {
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    },
}));

function Trends(props) {

    const classes = useStyles();
    const { projects } = props

    
    return (
        <div className={classes.root}>
            <Grid container spacing={3}>
                <h2>Hello</h2>
                {
                    projects.map((project) => {
                        return(
                            <Grid item xs={6} sm={3}>
                                <Paper className={classes.paper}>xs=6 sm=3</Paper>
                                <img src={project.image} />
                                <h4>{project.title}</h4>
                                <p>{project.description}</p>
                            </Grid>
                        )
                    })
                }

            </Grid>
        </div>
    );
}

export default Trends
