import { createSlice } from "@reduxjs/toolkit";

// Crear el slice para manejar el estado relacionado con los pokemons
const pokeSlice = createSlice(
  {
    name: 'pokemon',
    initialState: {
      allPokemons: [],
      allTypes: [],
      pokemonDetail: []
    },

    reducers: {

    setSearchPokemon: (state, action) => {
      state.allPokemons = action.payload;
      state.searchPokemon = action.payload
    },

    getAllPokemons: (state, action) => {
      state.allPokemons = action.payload;
    },

    getAllTypes: (state, action) => {
      state.allTypes = action.payload
    },

    getPokemonDetail: (state, action) => {
      state.pokemonDetail = action.payload
    }
}
});
  
  // Exportar acciones y el reducer
  export const { 
    setSearchPokemon,
    getAllTypes,
    getAllPokemons, 
    getPokemonDetail
   } = pokeSlice.actions;
  export default pokeSlice.reducer;