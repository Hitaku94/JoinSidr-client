import React, {useState} from 'react';
import {Link} from 'react-router-dom'
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

const Settings = (props) => {
    const {loggedInUser, onEdit} = props
    const [user, updateUser ]= useState(loggedInUser)
   

    const handleChangeUser = (event) => updateUser({
        ...user,
        [event.currentTarget.name] : event.currentTarget.value
    })
    console.log(props)
    return (
            
        <div className="container">
            <div className="header">
            <h1>Hello @</h1>
            <h3>Here you can edit your profile.</h3>
            </div>
        </div>
    )
}
export default Settings