import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import {
    Drawer, CssBaseline, AppBar, Toolbar, List, Typography, Divider, IconButton, ListItem, ListItemIcon, ListItemText, Hidden
} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import PowerSettingsNewIcon from '@material-ui/icons/PowerSettingsNew';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import SettingsIcon from '@material-ui/icons/Settings';
import MessageIcon from '@material-ui/icons/Message';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import { Link } from 'react-router-dom'
import { Paper, Grid } from '@material-ui/core';
import '../DrawerLeft.css'

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
    },
    drawer: {
        [theme.breakpoints.up('sm')]: {
            width: drawerWidth,
            flexShrink: 0,
        },
    },
    appBar: {
        [theme.breakpoints.up('sm')]: {
            width: `calc(100% - ${drawerWidth}px)`,
            marginLeft: drawerWidth,
        },
    },
    menuButton: {
        marginRight: theme.spacing(2),
        [theme.breakpoints.up('sm')]: {
            display: 'none',
        },
    },
    // necessary for content to be below app bar
    toolbar: theme.mixins.toolbar,
    drawerPaper: {
        width: drawerWidth,
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing(3),
    },
    paper: {
        padding: theme.spacing(0),
        color: theme.palette.text.secondary,
        width: "100%",


    },
    image: {
        width: "100%",
        height: 300,

    },

    h3: {
        margin: 5,
        color: theme.palette.text.secondary,
    },
}));

function FollowProject(props) {
    const { window, user, projects, onLogout, allUsers, jobs } = props;
    const classes = useStyles();
    const theme = useTheme();
    const [mobileOpen, setMobileOpen] = React.useState(false);

    if (!projects || !user || !jobs) {
        return <p>Loading . . .</p>
    }

    let filteredProject = projects.filter((e) => {
        return e.user._id == user._id
    })

    let filteredFollow = projects.filter((e) => {
        return user.follow.includes(e.user._id)
    })

    let filteredJob = jobs.filter((e) => {
        return e.user._id == user._id
    })

    let followers = 0;
    allUsers.forEach((e) => {
        if (e.follow.includes(user._id)) {
            followers++
        }
    })

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    const drawer = (
        <div>
            <div className={classes.toolbar} style={{ display: "flex", alignContent: "center", justifyContent: "center", alignItems: "center", }}>

                <Link className="linkLogo" to="/">
                    <h1 className="logo">JoinSidr</h1>
                </Link>

            </div>
            <Divider />
            <div className="infoProfile">
                <img className="profilePic" src={user.profilePic} alt={user.username} />
                <h2>{user.username}</h2>
                <div className="countryBox">
                    <LocationOnIcon style={{ width: 20 }} />
                    <h5 className="country">{user.country}</h5>
                </div>
            </div>
            <List>
                <ListItem>
                    <ListItemText >Followers</ListItemText>
                    {followers}
                </ListItem>
                <ListItem>
                    <ListItemText>Following</ListItemText>
                    {
                        user.follow ? user.follow.length : 0
                    }

                </ListItem>
            </List>
            <Divider />
            <List>
                <Link className="linkIcon" to="/userslist">
                    <ListItem>
                        <MessageIcon className="iconSpace" />
                        <ListItemText className="iconSpace">Messages</ListItemText>
                    </ListItem>
                </Link>
                <Link className="linkIcon" to="/security">
                    <ListItem>
                        <AccountCircleIcon className="iconSpace" />
                        <ListItemText className="iconSpace">Account</ListItemText>
                    </ListItem>
                </Link>
                <Link className="linkIcon" to="/settings">
                    <ListItem>
                        <SettingsIcon className="iconSpace" />
                        <ListItemText className="iconSpace">Settings</ListItemText>
                    </ListItem>
                </Link>
                <button onClick={onLogout} className="btnLogOut">
                    <ListItem>
                        <PowerSettingsNewIcon className="iconSpace" />
                        <ListItemText className="iconSpace">Log out</ListItemText>
                    </ListItem>
                </button>
            </List>
        </div>
    );



    const container = window !== undefined ? () => window().document.body : undefined;


    return (
        <div className={classes.root}>
            <CssBaseline />
            <AppBar position="fixed" className={classes.appBar}>
                <Toolbar className="profile-app-bar">
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        edge="start"
                        onClick={handleDrawerToggle}
                        className={classes.menuButton}
                    >
                        <MenuIcon />
                    </IconButton>
                    <div className="mininav-profile">

                        <h2 className="Welome-name">Welcome {user.username}</h2>

                        <Link to="/trends" className="navbar-link-slide">Trending Projects</Link>
                        <Link to="/jobsList" className="navbar-link-slide">Jobs List</Link>
                        <Link to="/" className="navbar-link-slide">About</Link>


                    </div>
                </Toolbar>
            </AppBar>
            <nav className={classes.drawer} aria-label="mailbox folders">
                {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
                <Hidden smUp implementation="css">
                    <Drawer
                        container={container}
                        variant="temporary"
                        anchor={theme.direction === 'rtl' ? 'right' : 'left'}
                        open={mobileOpen}
                        onClose={handleDrawerToggle}
                        classes={{
                            paper: classes.drawerPaper,
                        }}
                        ModalProps={{
                            keepMounted: true, // Better open performance on mobile.
                        }}
                    >
                        {drawer}
                    </Drawer>
                </Hidden>
                <Hidden xsDown implementation="css">
                    <Drawer
                        classes={{
                            paper: classes.drawerPaper,
                        }}
                        variant="permanent"
                        open
                    >
                        {drawer}
                    </Drawer>
                </Hidden>
            </nav>
            <main className={classes.content}>
                <ul className="nav">
                    <Link className="link" to="/profile"><li>Gallery</li></Link>
                    <Link className="link" to="/profile/collections"><li>Collections</li></Link>
                    <Link className="link" to="/profile/follow"><li>Follow</li></Link>
                </ul>
                {
                    user.userType == "Workfluencer"
                        ? <div className=" grille" >
                            
                            {

                                filteredFollow.map((project) => {
                                    return (
                                        <>
                                            <div key={project._id} className="box">
                                                <img className="box-imgBox" src={project.image} alt={project.image} />
                                                <Link className="link" to={`/project/${project._id}`}>
                                                    <div className="details">
                                                        <div className="content">
                                                            <h2>{project.title}</h2>
                                                        </div>
                                                    </div>
                                                </Link>

                                            </div>
                                        </>

                                    )
                                }

                                )}
                        </div>
                        : <div className=" grille" >
                            
                            {

                                filteredFollow.map((job) => {
                                    return (
                                        <>
                                            <div key={job._id} className="box">
                                                <img className="box-imgBox" src={job.image} alt={job.image} />
                                                <Link className="link" to={`/job/${job._id}`}>
                                                    <div className="details">
                                                        <div className="content">
                                                            <h2>{job.title}</h2>
                                                        </div>
                                                    </div>
                                                </Link>

                                            </div>
                                        </>

                                    )
                                }

                                )}
                        </div>
                }
            </main>
        </div>
    );
}

FollowProject.propTypes = {
    /**
     * Injected by the documentation to work in an iframe.
     * You won't need it on your project.
     */
    window: PropTypes.func,
};

export default FollowProject;