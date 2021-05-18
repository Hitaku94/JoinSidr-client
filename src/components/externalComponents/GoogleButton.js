import React from 'react'
import GoogleLogin from 'react-google-login';

function GoogleButton(props) {
    const {onSuccess, onFailure} = props
   
    return (
        <div>
            <GoogleLogin
                clientId="707533939431-o4qrrtj8dktimej5ij864bri1umm49g4.apps.googleusercontent.com"
                buttonText="Login"
                onSuccess={onSuccess}
                onFailure={onFailure}
                cookiePolicy={'single_host_origin'}
            />
        </div>
    )
}

export default GoogleButton