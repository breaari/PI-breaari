import React from 'react';
import { Link } from 'react-router-dom';
import "../Landing/landingStyle.css";
// import landing from "../assets/landing.mp4";
import landing from "../../assets/landing.mp4"


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
            <button className= "start-button">Pokédex</button>
          </Link>
        </div>
      </div>
    );
  };
  
  export default LandingPage;