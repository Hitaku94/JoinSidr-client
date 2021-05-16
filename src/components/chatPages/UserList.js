import axios from 'axios'
import React, { Component } from 'react'
import config from "../../config"

class UserList extends Component {

    handleChatClick = (chatUserId) => {
        const { user } = this.props
        if(!user){
            this.props.history.push('/signin')
        }
        else {
           let data = {
               participants: [chatUserId, user._id]
           }
           axios.post(`${config.API_URL}/api/conversation`, data, {withCredentials: true})
                .then((response) => {
                    this.props.history.push(`/chat/${response.data._id}`)
                })
            
        }
    }

    render() {
        const { users, user } = this.props
        // remove yourself if you're signed in
        let allUsers = users
        if (!user){
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
                            <div id="listOfUsers">
                            <img src={user.profilePic} alt={user.name}></img>
                            <div id="inside-user">
                            <p>
                                {user.username} 
                                
                            </p>
                            <button onClick={() => { this.handleChatClick(user._id) }}>
                                   Chat
                                </button>
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