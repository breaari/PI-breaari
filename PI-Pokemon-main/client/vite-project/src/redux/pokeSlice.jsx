import { createSlice } from "@reduxjs/toolkit";

// Crear el slice para manejar el estado relacionado con los pokemons
const pokeSlice = createSlice({
    name: 'pokemon',
    initialState: {
      allPokemons: [],
      allTypes: [],
    },
    reducers: {
      setPokedex: (state, action) => {
        state.allPokemons = action.payload;
        state.allTypes = [...new Set(action.payload.map(pokemon => pokemon.type))];
      },
      setSearchPokemon: (state, action) => {
        state.allPokemons = action.payload;
      },
    },
  });
  
  // Exportar acciones y el reducer
  export const { setPokedex, setSearchPokemon } = pokeSlice.actions;
  export default pokeSlice.reducer;