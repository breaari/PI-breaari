import React, { useState } from "react";
import { useDispatch } from "react-redux";
import axios from "axios"
import { setSearchPokemon } from "../redux/pokeSlice";

const URL = `http://localhost:3001/pokemon/name`
const SearchBar = ({  }) => {
    //onSearch

    const dispatch = useDispatch();

    const [ state, setState ] = useState("");
  
    function handleChange(e) {
      setState(e.target.value);
    }

    const handleSubmit = async(event) => {
      try {
        event.preventDefault();
        const response = await axios.get(`${URL}/${state}`)
        dispatch(setSearchPokemon(response.data))
        
      } catch (error) {
        console.log("Error en handleSubmit", error.message)
        
      }
    }
  
    return (
      <div>
        <form onSubmit = {handleSubmit}>
        <input type='search' onChange={handleChange} value={state} />
        <button  type="submit">Buscar, en algún momento podré poner una lupa</button>
        </form>
      </div>
    );
  }

  export default SearchBar;
  