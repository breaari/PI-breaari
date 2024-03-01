import { createSlice } from "@reduxjs/toolkit";

// Crear el slice para manejar el estado relacionado con los pokemons
const pokeSlice = createSlice(
  {
    name: 'pokemon',
    initialState: {
      allPokemons: [],
      allTypes: [],
      pokemonDetail: [],
      renderData: [],
      historyRenderData: [],
      selectedType: null

    },

    reducers: {

      setType: (state, action) => {
        console.log("state selectedType:", state)
        state.selectedType = action.payload
      },

      setHistory: (state,action) => {
        state.historyRenderData= action.payload;
      },
      setRenderData: (state, action) => {
        state.renderData = action.payload;
      },

    setSearchPokemon: (state, action) => {
      state.allPokemons = action.payload;
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
    getPokemonDetail,
    setRenderData,
    setHistory, 
    setType
   } = pokeSlice.actions;
  export default pokeSlice.reducer;