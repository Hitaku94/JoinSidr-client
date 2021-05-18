import { Container } from '@material-ui/core'
import React from 'react'
import {Link} from  'react-router-dom'
import '../ChoicePage.css'

function ChoicePage(props) {

    const { onEdit, onChoose } = props
    let userId = props.match.params.id
    
    return (
        <div className="body">
            
            <div className="boxLeft">
                <div className="miniBoxLeft">
                    <div className="overlay">
                        <form onSubmit={() => onChoose("Workfluencer")}>
                        <button type="submit" className="overlay-link">Web dev</button>
                        </form>
                    </div>
                </div>
            </div>
            <div className="boxRight">
                <div className="miniBoxRight">
                    <div className="overlay">
                    <form onSubmit={() => onChoose("Recruiter")}>
                    <button type="submit" className="overlay-link">Recruiter</button>
                    </form>
                    </div>
                </div>
            </div>
           
                <span className="are-you"><span className="are">Are</span><span className="you">You</span></span>
            
        </div>
    )
}

export default ChoicePage
