import React from 'react'
import axios from 'axios';
import { useEffect, useState } from "react";
import config from "../config";

function UserProfile(props) {

    const [user, updateUser] = useState(null)

    useEffect(() => {
        let userId = props.match.params.id
        console.log(props.match)
        axios.get(`${config.API_URL}/api/userProfile/${userId}`, { withCredentials: true })
            .then((response) => {
                console.log(response.data)
                updateUser(response.data)
            })
            .catch(() => {
                console.log("Detail fetch failed")
            })
    }, [])

    if (!user) {
        return <h1>Loading</h1>
    }

    return (
        <div>
            <h1>{user.username}</h1>
        </div>
    )
}

export default UserProfile
