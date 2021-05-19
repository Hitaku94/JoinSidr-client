import React from 'react'
import ClippedDrawer from './DrawerLeft'

function Profile(props) {

    const {user, projects, onLogout, allUsers, jobs} = props

    if (!projects || !jobs){
        return <h1>Loading</h1>
    }

    return (
        <>
            <ClippedDrawer user={user} projects={projects} jobs={jobs} allUsers={allUsers} onLogout={onLogout} />
        </>
    )
}

export default Profile
