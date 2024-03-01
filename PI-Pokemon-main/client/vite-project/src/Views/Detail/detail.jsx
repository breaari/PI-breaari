import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPokemonDetail } from "../../redux/pokeSlice";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import "../Detail/detail.css"

const Detail = () => {
    const { id } = useParams();
    const URL = `http://localhost:3001/pokemon/${id}`;
    const dispatch = useDispatch();
    const pokeDetail = useSelector((state) => state.pokemon.pokemonDetail);
    const navigate = useNavigate();

    const RedirectToHome = () => {
        navigate("/home")
      }
   
    useEffect(() => {
        const getPokemonData = async () => {
            try {
                const response = await axios.get(URL);
                dispatch(getPokemonDetail(response.data));
            } catch (error) {
                console.error("Error fetching Pokemon details:", error);
            }
        };

        getPokemonData();
    }, [URL, dispatch]);

    return ( 
        
        <div className="detail-container">
          <div className="background-image"></div>
            <div className="content">
            <div className="image-detail">
                <p className= 'name'>{pokeDetail?.name}</p>
                <img className= 'image' src={pokeDetail?.image} alt={pokeDetail?.name} />
            </div>
            <div className="info-container">
               <p className= 'detailInfo'>HP: {pokeDetail?.hp}</p>
               <p className= 'detailInfo'>Attack: {pokeDetail?.attack}</p>
               <p className= 'detailInfo'>Defense: {pokeDetail?.defense}</p>
               <p className= 'detailInfo'>Speed: {pokeDetail?.speed}</p>
               <p className= 'detailInfo'>Height: {pokeDetail?.height}</p>
               <p className= 'detailInfo'>Weight: {pokeDetail?.weight}</p>
               <p className= 'detailInfo'>Types: {pokeDetail?.types}</p>
            </div>
                    <button className="home-button" onClick={RedirectToHome}>Home</button>
            </div>
        </div>
            
    );
};

export default Detail;
