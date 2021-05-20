import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Paper, Grid, Divider } from '@material-ui/core';
import SearchBar from './SearchBar'
import { Link } from 'react-router-dom'
import MiniNavBar from "./MiniNavBar";

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        margin: 75
    },
    paper: {
        padding: theme.spacing(0),
        color: theme.palette.text.secondary,
        width: 270,


    },
    grid: {
        display: "flex",
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
        borderRadius: 10,

    },
    image: {
        width: "100%",
        height: 200,
        top: 0,
        left: 0,
    },

    h3: {
        margin: 5,
        color: theme.palette.text.secondary,
    },

}));

function Trends(props) {
    const classes = useStyles();
    const { projects, onSearch, user, likes, unlikes } = props




    if (!projects) {
        return <p>Loading . . .</p>
    }

    return (
        <>
        <MiniNavBar />
        <div style={{ marginTop: 50 }}>
            <SearchBar onSearch={onSearch} />
            <div className={classes.root}>

                <Grid container spacing={5}>
                    {

                        projects.map((project) => {
                            return (

                                <Grid className={classes.grid} item xs={12} sm={6} md={4} lg={3}>
                                    <Paper className={classes.paper}>
                                        <Link to={`/project/${project._id}`}>
                                            <img className={classes.image} src={project.image} alt={project.image} />
                                            <Divider />
                                        </Link>
                                        <div>
                                            <Link to={`/project/${project._id}`}>
                                                <h3 className={classes.h3}>{project.title}</h3>
                                            </Link>
                                            {
                                                user._id == project.user._id
                                                    ? <><Link to={`/profile`}><p className={classes.h3}>by: {project.user?.username}</p></Link></>
                                                    : <><Link to={`/user/${project.user._id}`}><p className={classes.h3}>by: {project.user?.username}</p></Link></>
                                            }

                                            {/*{
                                                project.like && project.like.includes(user._id)
                                                    ? <button onClick={() => unlikes(project._id)}>unlike</button>
                                                    : <button onClick={() => likes(project._id)}>like</button>
                                            }*/}

                                        </div>

                                    </Paper>
                                </Grid>

                            )
                        }

                        )}
                </Grid>

            </div>
        </div>
        </>
    );
}

export default Trends