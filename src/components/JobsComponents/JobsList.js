import React from 'react';
import { makeStyles, fade } from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import IconButton from '@material-ui/core/IconButton';
import InfoIcon from '@material-ui/icons/Info';
import { Paper, Grid, Divider } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import InputBase from '@material-ui/core/InputBase';
import SearchBar from '../SearchBar'
import { Link } from 'react-router-dom'

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

function JobsList(props) {
    const classes = useStyles();
    const { jobs, onSearch, user } = props

    if (!jobs) {
        return <p>Loading . . .</p>
    }

    return (
        <div style={{ marginTop: 50 }}>
            <SearchBar onSearch={onSearch} />
            <div className={classes.root}>

                <Grid container spacing={5}>
                    {

                        jobs.map((job) => {
                            return (

                                <Grid className={classes.grid} item xs={12} sm={6} md={4} lg={3}>
                                    <Paper className={classes.paper}>
                                        <Link to={`/job/${job._id}`}>
                                            <img className={classes.image} src={job.image} alt={job.image} />
                                            <Divider />
                                        </Link>
                                        <div>
                                            <Link to={`/job/${job._id}`}>
                                                <h3 className={classes.h3}>{job.title}</h3>
                                            </Link>
                                            {
                                                user._id == job.user._id
                                                    ? <><Link to={`/profile`}><p className={classes.h3}>by: {job.user?.username}</p></Link></>
                                                    : <><Link to={`/user/${job.user._id}`}><p className={classes.h3}>by: {job.user?.username}</p></Link></>
                                            }
                                        </div>

                                    </Paper>
                                </Grid>

                            )
                        }

                        )}
                </Grid>

            </div>
        </div>
    );
}

export default JobsList