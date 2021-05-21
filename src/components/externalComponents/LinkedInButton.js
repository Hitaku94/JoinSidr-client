import React, { Component } from 'react';
import { LinkedIn } from 'react-linkedin-login-oauth2';
import linkedin from 'react-linkedin-login-oauth2/assets/linkedin.png'

class LinkedInButton extends Component {

  render() {
    const { onSuccess, onFailure } = this.props
    return (
      <div >
        <LinkedIn
        id="linkedin"
        style={{display:"flex", padding:0 , border:"none"}}
          clientId="78ehlghrz59uta"
          onFailure={onFailure}
          onSuccess={onSuccess}
          scope={'r_liteprofile r_emailaddress'}
          redirectUri={`http://localhost:3000/linkedin`}
        >
          <img src="images/linkedinbut.png" id="button-linkedin" alt="Log in with Linked In" style={{ maxWidth: '180px' }} />
        </LinkedIn>
      </div>
    );
  }
}

export default LinkedInButton;