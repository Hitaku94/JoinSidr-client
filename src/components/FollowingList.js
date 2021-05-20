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
import axios from 'axios'
import config from "../config";

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

function FollowingList(props) {
    const { window, user, projects, onLogout, allUsers, jobs } = props;
    const classes = useStyles();
    const theme = useTheme();
    const [mobileOpen, setMobileOpen] = React.useState(false);

    const handleChatClick = (chatUserId) => {
            let data = {
                participants: [chatUserId, user._id]
            }
            axios.post(`${config.API_URL}/api/conversation`, data, { withCredentials: true })
                .then((response) => {
                    props.history.push(`/chat/${response.data._id}`)
                })

        }
    

    if (!projects || !user || !jobs) {
        return <p>Loading . . .</p>
    }

    let filteredFollowing = allUsers.filter((e) => {
        return user.follow.includes(e._id)
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

                        <h2 className="container-downer-navbar-profile">Welcome {user.username}</h2>

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
                    <Link to="/profile"><li>Gallery</li></Link>
                    <Link to="/profile/collections"><li>Collections</li></Link>
                    <Link to="/profile/follow"><li>Follow</li></Link>
                </ul>
                <div className=" grille" >
                    {
                        filteredFollowing.map((user) => {
                            return (
                                <>
                                    <div className="msg-box-container">
                                    
                                    <div className="msg-box-container-box">
                                    <Link to={`/user/${user._id}`}>
                                        <img className="msg-box-container-box-img" src={user.profilePic} />
                                        </Link>
                                    </div>
                                    <div className="msg-box-container-box-container">
                                        <div className="msg-box-container-box-info">
                                            <h3 className="msg-box-container-box-info-h3">{user.username}</h3>
                                            <Link className="msg-box-container-box-info-profile" to={`/user/${user._id}`}>profile</Link>
                                            <button className="msg-box-container-box-info-chat" onClick={() => { handleChatClick(user._id)}}>Chat</button>
                                        </div>
                                    </div>
                                </div>
                                </>

                            )
                        }

                        )}
                </div>

            </main>
        </div>
    );
}

FollowingList.propTypes = {
    /**
     * Injected by the documentation to work in an iframe.
     * You won't need it on your project.
     */
    window: PropTypes.func,
};

export default FollowingList;