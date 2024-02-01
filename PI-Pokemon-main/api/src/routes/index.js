const { Router } = require('express');
const express = require('express');
const { 
    getPokemonHandler, 
    pokemonsDataHandler, 
    pokemonNameHandler, 
    getPokemonIDHandler,
    pokemonCreateHandler
 } = require("../handlers/getPokemonHandler")
 const { getTypeHandler } = require("../handlers/getTypesHandler")
// Importar todos los routers;

const router = Router();

// Configurar los routers
router.get("/pokemon", pokemonsDataHandler);
router.get("/pokemon/name/:name", pokemonNameHandler);
router.get("/pokemon/:id", getPokemonIDHandler);
router.post('/pokemons', pokemonCreateHandler);
router.get('/types', getTypeHandler);

module.exports = router;


