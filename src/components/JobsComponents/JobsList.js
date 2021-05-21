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
import MiniNavBar from "../MiniNavBar";

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
        <>
        <MiniNavBar />
        <div style={{ marginTop: 50 }}>
            <h1 className="title-pages">All jobs</h1>
            <SearchBar onSearch={onSearch} />
            <div className={classes.root}>

                <div className="grille-trends">
                    {

                        jobs.map((job) => {
                            return (

                                <div key={job._id} className="box-trends">
                                        
                                            <div className="fond-blanc">
                                            <img className="box-imgBox-trends" src={job.image} alt={job.image} />
                                            </div>
                                            <Divider />
                                        <Link to={`/job/${job._id}`}>
                                        <div className="content-trends-box">
                                        <div className="content-trends">
                                                <h3 className="content-trends-h3">{job.title}</h3>
                                            {
                                                user?._id == job.user._id
                                                    ? <><Link className="content-trends-p" to={`/profile`}><p>{job.user?.username}</p></Link></>
                                                    : <><Link className="content-trends-p" to={`/user/${job.user._id}`}><p>{job.user?.username}</p></Link></>
                                            }

                                        </div>
                                        </div>
                                        </Link>
                                </div>

                            )
                        }

                        )}
                </div>

            </div>
        </div>
        </>
    );
}

export default JobsList