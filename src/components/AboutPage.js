import React from "react";
import MiniNavBar from "./MiniNavBar";




export default function AboutPage() {
    return (
        <>
        <MiniNavBar />
        <div>
        <h1>About JoinSidr</h1>
            <div id="about-title">
                <h2>About the project</h2>
                <p>JoinSidr is a MERN web application built in a week as the Final Project of an Intense 9-week Bootcamp @Ironhack. Our idea emerged as the answer to the question, "What tool could be
                useful to new web developers like us? And how can we help our co-students from the Bootcamp with our project?". The idea clicked instantly when we thaught about the next step of our new careers
                as web developers. We want to get inspired from other's work, share our work, get a feedback from more experienced Web Developers but also we want to find a way to connect recruiters in our process in order 
                to facilitate the job seeking/talent seeking for both sides. Make the best out of JoinSidr and don't forget #Trusttheprocess  </p>
            </div>
            <div id="about-creators">
                <h2>About us</h2>
                <p>
                Hi Workfluencers and recruiters! We are Taka and Yanis, both landing in the Tech World from years working in the tourism and food services industry. We recently experienced an amazing adventure doing 
                a 9-week intensive Bootcamp @Ironhack! Our challenge is to become Web Developers and keep learning by doing everyday. We both love sports....
                <br></br>
                We won't tell you more about us, if you're interested you can check our Linkedin profile and our Github! Hope you'll enjoy our work!
                </p>
            </div>
            <div id="founders">
                <div>
                <h3>Yanis Dimitropoulos</h3>
                <img src="images/yanis.png" alt="Yanis photo"/>
                <p>Linkedin:</p>
                <p>Github:</p>
                </div>
                <div>
                <h3>Takayuki Wada</h3>
                <img src="images/taka.png" alt="Taka photo"/>
                <p>Linkedin:</p>
                <p>Github:</p>
                </div>
            </div>

        </div>
        </>
    )
}
