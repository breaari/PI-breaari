const express = require('express');
const { getAllPokemons,
    processPokemon, 
    getPokemonData,
    getPokemonID,
    postPokemonCreate
} = require("../controllers/getAllPokemons")

const getPokemonHandler = async (req, res) => {
try {
    //petición al controller y enviar la respuesta
    const response =  await getAllPokemons()
    return res.status(200).json(response)
} catch (error) {
    return res.status(404).json( {error: "Error al obtener información de la API"})
}
    
}

const pokemonNameHandler = async (req, res) => {
    try {
    const { name } = req.params;
    const response = await getPokemonData(name);
        return res.status(200).json(response)
    }
    catch (error) {
        return res.status(404).json( { error: "Error al obtener el Pokemon"})
    }
}

const pokemonsDataHandler = async (req, res) => {
    try {
        const response = await processPokemon();
        return res.status(200).json(response)
    }
    catch (error) {
        return res.status(404).json( { error: "Error al obtener los nombres"})
    }
}

const getPokemonIDHandler = async (req, res) => {
    try {
        const { id } = req.params;
        const response = await getPokemonID(id);
        return res.status(200).json(response)
    }
    catch (error) {
        return res.status(404).json( { error: "Error al obtener el pokemon por ID"})
    }
}

const pokemonCreateHandler = async (req, res) => {
    try {
        const { name, image, hp, attack, defense, speed, height, weight, types } = req.body;
        const response = await postPokemonCreate({ name, image, hp, attack, defense, speed, height, weight, types });
        return res.status(200).json(response)
    }
    catch (error) {
        return res.status(404).json( { error: "Error al crear el Pokemon"})
    }
}

module.exports = { getPokemonHandler , pokemonsDataHandler, pokemonNameHandler, getPokemonIDHandler, pokemonCreateHandler};