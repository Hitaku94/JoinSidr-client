import React from 'react';
import { makeStyles, fade } from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import IconButton from '@material-ui/core/IconButton';
import InfoIcon from '@material-ui/icons/Info';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import SearchIcon from '@material-ui/icons/Search';
import InputBase from '@material-ui/core/InputBase';

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
    const { projects } = props
    return (
        
        <div className={classes.root}>
 
            <Grid container spacing={5}>
                {

                    projects.map((project) => {
                        return (
                            <Grid className={classes.grid} item xs={12} sm={6} md={4} lg={3}>
                                <Paper className={classes.paper}>
                                    
                                    <img className={classes.image} src={project.image} alt={project.image} />
                                    
                                    <div>
                                        <h3 className={classes.h3}>{project.title}</h3>
                                        <p className={classes.h3}>by: {project.title}</p>
                                    </div>
                                </Paper>
                            </Grid>
                        )
                    }

                    )}
            </Grid>
        
        </div>
    
    );
}

export default Trends