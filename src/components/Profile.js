import React from 'react'
import ClippedDrawer from './DrawerLeft'

function Profile(props) {

    const {user, projects} = props

    return (
        <>
            <ClippedDrawer user={user} projects={projects} />
        </>
    )
}

export default Profile
