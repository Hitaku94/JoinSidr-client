import React from 'react'
import { Link } from 'react-router-dom'
import { Divider } from '@material-ui/core';
import '../MiniNavBar.css'

function MiniNavBar() {
    return (
        <div>
            <Divider className="MuiAppBar-colorPrimary"/>
            <div className="container-downer-navbar container-downer-navbar-profile">
                <Link to="/trends" className="navbar-link-slide">Trending Projects</Link>
                <Link to="/jobsList" className="navbar-link-slide">Jobs List</Link>
                <Link to="/" className="navbar-link-slide">About</Link>
            </div>
            <Divider className="MuiAppBar-colorPrimary"/>
        </div>
    )
}

export default MiniNavBar
