import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Paper, Grid, Divider } from '@material-ui/core';
import SearchBar from './SearchBar'
import { Link } from 'react-router-dom'
import MiniNavBar from "./MiniNavBar";
import '../Trends.css'

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

            <div className="grille-trends" >
                    {

                        projects.map((project) => {
                            return (

                                <div key={project._id} className="box-trends">
                                        <Link to={`/project/${project._id}`}>
                                            <div className="fond-blanc">
                                            <img className="box-imgBox-trends" src={project.image} alt={project.image} />
                                            </div>
                                            <Divider />
                                        </Link>
                                        <div className="content-trends-box">
                                        <div className="content-trends">
                                            <Link className="link" to={`/project/${project._id}`}>
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
                                        </div>
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

export default Trends