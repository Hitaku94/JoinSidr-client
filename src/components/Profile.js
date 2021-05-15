import React from 'react'
import ClippedDrawer from './DrawerLeft'

function Profile(props) {

    const {user, projects, onLogout} = props

    if (!user){
        return <h1>Loading</h1>
    }

    return (
        <>
            <ClippedDrawer user={user} projects={projects} onLogout={onLogout} />
        </>
    )
}

export default Profile
