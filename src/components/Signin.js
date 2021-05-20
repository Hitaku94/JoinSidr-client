import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import GoogleButton from './externalComponents/GoogleButton';
import LinkedInButton from './externalComponents/LinkedInButton'
import {Link} from  'react-router-dom'
import '../Signin.css'
import MiniNavBar from "./MiniNavBar";

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://material-ui.com/">
        JoinSidr
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

function Signin(props) {
  const classes = useStyles();
  const { onSignIn, error, onGoogleSuccess, onGoogleFailure, onLinkedInSuccess, onLinkedInFailure } = props

  return (
    <>
        <MiniNavBar />
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <form onSubmit={onSignIn}  className={classes.form} noValidate>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Sign In
          </Button>
          {
                error && (<p style={{color:'red'}}>{error}</p>)
            }
          
              <div className='externalButtons'>
              <GoogleButton onSuccess={onGoogleSuccess} onFailure={onGoogleFailure}/>
          <LinkedInButton onSuccess={onLinkedInSuccess} onFailure={onLinkedInFailure} />
              </div>
          
      
            
 
              <Link className="link-profile" to="/signup" variant="body2">
                {"Don't have an account? Sign Up"}
              </Link>
          
        </form>
      </div>
      <Box mt={8}>
        <Copyright />
      </Box>
    </Container>
    </>
  );
}

export default Signin