import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import {
    Drawer, CssBaseline, AppBar, Toolbar, List, Typography, Divider, IconButton, ListItem, ListItemIcon, ListItemText, Hidden
} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';
import {Link} from  'react-router-dom'
import {Paper, Grid} from '@material-ui/core';
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
    grid: {
        display: "flex",
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
        borderRadius: 10,
        
    },
    image: {
        width: "100%",
        height: 300,
        top: 0,
        left: 0,
    },

    h3: {
        margin: 5,
        color: theme.palette.text.secondary,
    },
}));

function ResponsiveDrawer(props) {
    const { window, user, projects } = props;
    const classes = useStyles();
    const theme = useTheme();
    const [mobileOpen, setMobileOpen] = React.useState(false);

    let filteredProject = projects.filter((e) => {
        return e.user._id = user._id
    })

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    const drawer = (
        <div>
            <div className={classes.toolbar} />
            <Divider />
            <div className="imageProfile">
                <img style={{ width: 50 }} src="https://www.flaticon.com/svg/vstatic/svg/4624/4624069.svg?token=exp=1620908010~hmac=fc21835626062dd182e97801765607cf" />
                <h2>Taka Wada</h2>
                <h6>Web developper</h6>
                <h6>France</h6>
                <div>
                    <button>Follow</button>
                    <button>Message</button>
                    
                </div>
                <Link to="/project-create">Add project</Link>
            </div>
            <List>
                {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
                    <ListItem button key={text}>
                        <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
                        <ListItemText primary={text} />
                    </ListItem>
                ))}
            </List>
            <Divider />
            <List>
                {['All mail', 'Trash', 'Spam'].map((text, index) => (
                    <ListItem button key={text}>
                        <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
                        <ListItemText primary={text} />
                    </ListItem>
                ))}
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
                        Responsive drawer
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
                {
                    
                    filteredProject.map((project) => {
                        return (
                            
                            <Grid key={project._id} className={classes.grid} item xs={12} sm={12} md={6} lg={4}>
                                
                                <Paper className={classes.paper}>
                                <Link className="link" to={`/project/${project._id}`}>
                                    <img className={classes.image} src={project.image} alt={project.image} />
                                <Divider />
                                    <div>
                                        <h3 className={classes.h3}>{project.title}</h3>
                                        <p className={classes.h3}>{project.description}</p>
                                    </div>
                                    </Link>
                                    <Link className="link-edit" to={`/project-edit/${project._id}`}>Edit</Link>
                                </Paper>
                                
                            </Grid>
                            
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