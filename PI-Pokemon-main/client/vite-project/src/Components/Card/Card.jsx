import { Link } from 'react-router-dom'
import "../Card/Card.css"

const Card = ({ poke }) => {

    const { id, name, image, types } = poke
    
      return ( 
        
        <div className="card-container" >
            <div className= 'image-container'>
            <Link to={`/detail/${id}`} className="card-link">
              <img className= 'image-card' src={image} alt={name}/>
              </Link>
            </div>
            <h2 className= 'name-card no-underline'>{name}</h2>
            <p className= 'types-card no-underline'>{types}</p>
        </div>

  );
};

export default Card;