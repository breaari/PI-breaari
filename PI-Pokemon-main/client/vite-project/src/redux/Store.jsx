import { configureStore } from '@reduxjs/toolkit';
import pokeReducer from "../redux/pokeSlice"

export const store = configureStore({
   reducer: {pokemon: pokeReducer}
}
    );

