import { Container } from '@material-ui/core'
import React from 'react'
import {Link} from  'react-router-dom'
import '../ChoicePage.css'

function ChoicePage() {
    return (
        <div className="body">
            
            <div className="boxLeft">
                <div className="miniBoxLeft">
                    <div className="overlay">
                        <Link className="overlay-link" to="/" >Web dev</Link>
                    </div>
                </div>
            </div>
            <div className="boxRight">
                <div className="miniBoxRight">
                    <div className="overlay">
                    <Link className="overlay-link" to="/" >Recruiter</Link>
                    </div>
                </div>
            </div>
           
                <span className="are-you"><span className="are">Are</span><span className="you">You</span></span>
            
        </div>
    )
}

export default ChoicePage
