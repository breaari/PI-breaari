import React from 'react';
import { Link } from 'react-router-dom';
import "../Landing/landingStyle.css";
import landing from "../../assets/landing.mp4"
import pokedex from "../../assets/pokedex.png"


const LandingPage = () => {
    return (
      <div className="landing-container">
        <div className= "container-video">
          <video autoPlay muted loop id="background-video">
            <source src= { landing } type="video/mp4"  alt="landing" />
          </video>
        </div>
        <div className="button-container">
          <Link to="/home">
           <img src={pokedex} alt="Start" className="start-button" />
          </Link>
        </div>
      </div>
    );
  };
  
  export default LandingPage;