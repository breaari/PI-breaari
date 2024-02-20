import React, { useState } from "react";
import { useDispatch } from "react-redux";
import axios from "axios"
import { setSearchPokemon } from "../../redux/pokeSlice";
import "../SearchBar/Searchbar.css"
import { useNavigate } from "react-router-dom";
import Create from "../../assets/Create.png"
import pokedex from "../../assets/pokedex.png"

const URL = `http://localhost:3001/pokemon/name`
const SearchBar = () => {

   const RedirectToCreate = () => {
     navigate("/create")
   }

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [ state, setState ] = useState();
  
    function handleChange(e) {
      setState(e.target.value);
    }

    const handleSubmit = async(event) => {
      try {
        event.preventDefault();
        const response = await axios.get(`${URL}/${state}`)
        dispatch(setSearchPokemon([response.data]))
        
      } catch (error) {
        console.log("Error en handleSubmit", error.message)
        
      }
    }
  
    return (
      <div className="form-container2">
        <img src={pokedex} alt="Logo" className="logo" /> 
    <form className='form2' onSubmit={handleSubmit}>
      <div className="input-container2">
      <input className="input-search" type='search' onChange={handleChange} value={state} placeholder="   Search your Pokémon..." />
      <button className="button-submit" type="submit"></button>
      </div>
    </form>
    <button className="create-button" onClick={RedirectToCreate}>
      Create <img src={Create} alt="Create Icon" />
      </button>
  </div>
    );
  }

  export default SearchBar;
  