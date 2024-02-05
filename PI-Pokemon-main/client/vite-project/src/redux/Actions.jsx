// import { useDispatch } from "react-redux";
// import axios from "axios";
// import React from "react";

// export const GET_POKEDEX = "GET_POKEDEX";
// export const SEARCH_POKEMON = "SEARCH_POKEMON";

// const URL = "http://localhost:3001/pokemon";

// const getAllPokemons = () => {
//     const dispatch = useDispatch();
//     return async () => {
//         try {
//             const { data } = await axios(URL);
//             return dispatch({ type: GET_POKEDEX, payload: data });
//         } catch (error) {
//             console.log(error);
//         }
//     };
// };

// const searchPokemon = (name) => {
//     const dispatch = useDispatch();
//     return async () => {
//         try {
//             const { data } = await axios.get(`${URL}/name?name=${name}`);
//             return dispatch({ type: SEARCH_POKEMON, payload: data });
//         } catch (error) {
//             window.alert("Pokemon no encontrado");
//         }
//     };
// };

// export { searchPokemon, getAllPokemons };