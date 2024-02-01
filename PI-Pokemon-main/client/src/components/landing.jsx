import React from 'react';
import { Link } from 'react-router-dom';
import { cartas } from "../assets"

const landing = () => {
    return (
        <div>
        <img src={ cartas } alt="cartas" />
        <Link to="/home">
        <button>Start</button>
        </Link>
      </div>
    );
  };
  
  export default landing;