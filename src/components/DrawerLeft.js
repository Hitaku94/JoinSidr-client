import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import {
    Drawer, CssBaseline, AppBar, Toolbar, List, Typography, Divider, IconButton, ListItem, ListItemIcon, ListItemText, Hidden
} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';
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

function ResponsiveDrawer(props) {
    const { window, user, projects, onLogout } = props;
    const classes = useStyles();
    const theme = useTheme();
    const [mobileOpen, setMobileOpen] = React.useState(false);

    let filteredProject = projects.filter((e) => {
        return e.user._id == user._id
    })


    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    const drawer = (
        <div>
            <div className={classes.toolbar} style={{display: "flex", alignContent: "center", justifyContent: "center", alignItems: "center",}}>
               
                <Link className="linkLogo" to="/">
                <h1 className="logo">JoinSidr</h1>
                </Link>
                
                </div>
            <Divider />
            <div className="infoProfile">
                <img className="profilePic" src={user.profilePic} alt={user.username} />
                <h2>{user.username}</h2>
                <div className="countryBox">
                <LocationOnIcon style={{width: 20}}/>
                <h5 className="country">{user.country}</h5>
                </div>
                <div>
                    <button className="followBtn">Follow</button>
                    <button className="msgBtn"> <Link to="/userslist">Message</Link></button>
                </div>
            </div>
            <List>
                <ListItem>
                    <ListItemText >Followers</ListItemText>
                        0
                </ListItem>
                <ListItem>
                    <ListItemText>Following</ListItemText>
                        0
                </ListItem>
            </List>
            <Divider />
            <List>
            <Link className="linkIcon" to="/userslist">
                <ListItem>
                    <MessageIcon className="iconSpace"/>
                    <ListItemText className="iconSpace">Messages</ListItemText>
                </ListItem>
                </Link>
                <Link className="linkIcon" to="/security">
                <ListItem>
                    <AccountCircleIcon className="iconSpace"/>
                    <ListItemText className="iconSpace">Account</ListItemText>
                </ListItem>
                </Link>
                <Link className="linkIcon" to="/settings">
                <ListItem>
                    <SettingsIcon className="iconSpace"/>
                    <ListItemText className="iconSpace">Settings</ListItemText>
                </ListItem>
                </Link>
                <button onClick={onLogout} className="btnLogOut">
                <ListItem>
                    <PowerSettingsNewIcon className="iconSpace"/>
                    <ListItemText className="iconSpace">Log out</ListItemText>
                </ListItem>
                </button>
            </List>
        </div>
    );



    const container = window !== undefined ? () => window().document.body : undefined;

    if (!projects) {
        return <p>Loading . . .</p>
    }

    return (
        <div className={classes.root}>
            <CssBaseline />
            <AppBar position="fixed" className={classes.appBar}>
                <Toolbar>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        edge="start"
                        onClick={handleDrawerToggle}
                        className={classes.menuButton}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" noWrap>
                        Welcome {user.username}
                    </Typography>
                    <Typography className={classes.title, "navItem"} variant="h6" noWrap color="inherit">
                    <Link to="/trends" className="slide-bar" color="inherit">Trending projects </Link>
                    </Typography>
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
                <div className={classes.toolbar} />
                <Grid container spacing={5}>
                    <Grid className="uploadBox" item xs={12} sm={12} md={6} lg={4}>
                        <div className="upload">
                            <h2>Upload your Project</h2>
                            <div>
                                <p>Show off your best work, and be part of a growing community</p>
                                <Link className="uploadLink" to="/project-create">Add project</Link>
                            </div>
                        </div>
                    </Grid>
                    {

                        filteredProject.map((project) => {
                            return (
                                <>
                                    <Grid key={project._id} className="box" item xs={12} sm={12} md={6} lg={4}>



                                        <div className="imgBox">

                                            <img className="imgProject" src={project.image} alt={project.image} />

                                        </div>
                                        <Link className="link" to={`/project/${project._id}`}>
                                            <div className="details">

                                                <div className="content">
                                                   
                                                    <h2>{project.title}</h2>

                                                </div>

                                            </div>
                                        </Link>

                                    </Grid>
                                </>

                            )
                        }

                        )}
                </Grid>
            </main>
        </div>
    );
}

ResponsiveDrawer.propTypes = {
    /**
     * Injected by the documentation to work in an iframe.
     * You won't need it on your project.
     */
    window: PropTypes.func,
};

export default ResponsiveDrawer;