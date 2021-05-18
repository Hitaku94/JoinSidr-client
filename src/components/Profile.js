import React from 'react'
import ClippedDrawer from './DrawerLeft'

function Profile(props) {

    const {user, projects, onLogout, allUsers} = props

    if (!projects){
        return <h1>Loading</h1>
    }

    return (
        <>
            <ClippedDrawer user={user} projects={projects} allUsers={allUsers} onLogout={onLogout} />
        </>
    )
}

export default Profile
