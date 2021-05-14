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
            <h1>Hello @{loggedInUser.username}</h1>
            <h3>Here you can edit your profile.</h3>
            </div>
            <form onSubmit={onEdit} className="form-center" noValidate autoComplete="off">
                <TextField  name="country"  type="text" variant="filled"  label="Country" onChange={handleChangeUser} value={user.country}/>
                <TextField  name="description"  type="text" variant="filled"  label="description" onChange={handleChangeUser} value={user.description}/>
                <Button className="my-btn" type="submit" variant="contained">Save</Button>
            </form>
        </div>
    )
}
export default Settings