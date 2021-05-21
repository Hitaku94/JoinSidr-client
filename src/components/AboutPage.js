import React from "react";
import MiniNavBar from "./MiniNavBar";
import "./about.css"
import { Link } from 'react-router-dom'



export default function AboutPage() {
    return (
        <>
        <MiniNavBar />
        <div id="about-body">
        <h1 id="aboutTitle">About JoinSidr</h1>
        <div id="about-text">
        <div id="about-title">
                <h2>About the project</h2>
                <p>JoinSidr is a MERN web application built in a week as the Final Project of an Intense 9-week Bootcamp @Ironhack.<br></br><br></br> Our idea emerged as the answer to the question, "What tool could be
                useful to new web developers like us? And how can we help our co-students from the Bootcamp with our project?". <br></br><br></br>The idea clicked instantly when we thaught about the next step of our new careers
                as web developers. We want to get inspired from other's work, share our work, get a feedback from more experienced Web Developers but also we want to find a way to connect recruiters in our process in order 
                to facilitate the job seeking/talent seeking for both sides.<br></br><br></br> Make the best out of JoinSidr and don't forget #Trusttheprocess  </p>
            </div>
            <div id="about-creators">
                <h2>About us</h2>
                <p>
                Hi Workfluencers and recruiters!<br></br><br></br> We are Taka and Yanis, both landing in the Tech World from years working in the tourism and food services industry.<br></br><br></br> We recently experienced an amazing adventure doing 
                a 9-week intensive Bootcamp @Ironhack! Our challenge is to become Web Developers and keep learning by doing everyday. We both love sports....
                <br></br><br></br>
                We won't tell you more about us, if you're interested you can check our Linkedin profile and our Github! Hope you'll enjoy our work!
                </p>
            </div>
        </div>
            
            
            <div id="founders">
                <div className="founders">
                <h3>Yanis Dimitropoulos</h3>
                <img id="yanis" src="images/yanis.png" alt="Yanis photo"/>
                <div className="linksProfile">
                <a href="https://www.linkedin.com/in/yanis-dimitropoulos/">
                    <img src="images/linkedin_icon.png"/>
                </a>

                <a href="https://github.com/YanisDim">
                    <img src="images/iconGithub.png"/>
                </a>
                </div>
                
                </div>
                
                <div className="founders"><h3>Takayuki Wada</h3>
                <img id="taka" src="images/taka.jpg" alt="Taka photo"/>
                <div className="linksProfile">
                <a href="https://www.linkedin.com/in/takayuki-wada/">
                    <img src="images/linkedin_icon.png"/>
                </a>

                <a href="https://github.com/Hitaku94">
                    <img src="images/iconGithub.png"/>
                </a>
                </div>
                
                
                </div>
                
                
            
            </div>
            

        </div>
        </>
    )
}
