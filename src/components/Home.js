import React from "react";
import { Grid, Button, Divider } from "@material-ui/core";
import { Redirect } from "react";
import { Link } from "react-router-dom";
import "../Home.css";
import MiniNavBar from "./MiniNavBar";
import NavBar from "./NavBar";

function Home(props) {
  const { user } = props;

  return (
    <>
      <MiniNavBar />
      <div id="top-section-home">
        <div id="top-section-title">
          <div id="top-color-image">
            <h1 id="home-h1">
              JoinSidr to become a Workfluencer or find here your next WorkStar!
            </h1>
            <p id="home-p">
              Our community brings together talents and recruiters!Join us and
            </p>
            <Link to="/signup" id="top-section-btn">
              Get Started!
            </Link>
          </div>
        </div>
        <div id="home-image">
          <img
            id="home-image"
            src="/images/domenico-loia-hGV2TfOh0ns-unsplash.jpg"
          />
        </div>
      </div>
      <div id="middle-container">
        <div className="middle-container-upper">
        <h2>
          Showcase your amazing work with our easy to use Online Portfolio
          Website
        </h2>
        </div>
        <div id="grid-section">
          <div id="grid-dev">
            <h3> For Web Developers </h3>
            </div>
            <div id="grid-dev">
            <p>
              JoinSidr is a brand new community, allowing you to share your
              work, follow inspiring professionals, and get in touch with
              recruiters from your field.Our passion and our devotion make us
              believe in helping each other and inspiring the newcomers in the
              Web Development field.Either you are a brand new developer or an
              experienced one our website aims to give you an intuitive solution
              that further elevate your experience.
            </p>
          </div>
          <div id="grid-dev" className="color-change">
            <h3> For Recruiters </h3>
            </div>
            <div id="grid-dev" className="color-change">
            <p>
              JoinSidr is also a way for recruiters to find their next
              talent.From newcomers to experienced Web Developers, you will find
              an amazing talent pool of web developers ready to jump on a new
              adventure by your side.With our web application
            </p>
          </div>
        </div>
        <div className="middle-container-downer"> 
        <p>"Individually we are one drop. Together, we are an ocean"

Ryunosuke Satoro</p>
<Link to="/signup" id="top-section-btn" className="downer-home-btn">
              Get Started!
            </Link>
        </div>

      </div>
    </>
  );
}

export default Home;
