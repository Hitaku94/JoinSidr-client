import axios from 'axios'
import React, { Component } from 'react'
import config from "../../config"
import "./UsersList.css"
import { Link } from 'react-router-dom'

class UserList extends Component {

    handleChatClick = (chatUserId) => {
        const { user } = this.props
        if (!user) {
            this.props.history.push('/signin')
        }
        else {
            let data = {
                participants: [chatUserId, user._id]
            }
            axios.post(`${config.API_URL}/api/conversation`, data, { withCredentials: true })
                .then((response) => {
                    this.props.history.push(`/chat/${response.data._id}`)
                })

        }
    }

    render() {
        const { users, user } = this.props
        // remove yourself if you're signed in
        let allUsers = users
        if (!user) {
            return <h1>Loading</h1>
        }
        if (user) {
            allUsers = users.filter(u => u._id !== user._id)
        }
        return (
            <div id="chatlist-main">
                <div className="chatlist-body">
                    {
                        allUsers.map((user) => {
                            return (
                                <div className="msg-box-container">
                                    
                                    <div className="msg-box-container-box">
                                    <Link to={`/user/${user._id}`}>
                                        <img className="msg-box-container-box-img" src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png" />
                                        </Link>
                                    </div>
                                    
                                    <div className="msg-box-container-box-container">
                                        <div className="msg-box-container-box-info">
                                            <h3 className="msg-box-container-box-info-h3">{user.username}</h3>
                                            <Link className="msg-box-container-box-info-profile" to={`/user/${user._id}`}>profile</Link>
                                            <button className="msg-box-container-box-info-chat" onClick={() => { this.handleChatClick(user._id)}}>Chat</button>
                                        </div>
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>

            </div>
        )
    }
}

export default UserList