import { useState } from "react";
import { useSelector } from "react-redux";
import SearchBar from "../../Components/Searchbar"

const Home = ({ onSearch }) => {
  const pokemon = useSelector((state)=>state.pokemon.allPokemons)
  console.log(pokemon)

  return (
    <div>
      <SearchBar onSearch={onSearch} />
      {/* Otro contenido del componente Home */}
    </div>
  );
}

export default Home;