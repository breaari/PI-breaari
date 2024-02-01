const axios = require("axios");
const { Pokemon, Type } = require("../db")
// const { Pokemon } = require("../models/Pokemon"); // Importa el modelo Pokemon
// const { Type }= require("../models/Type"); // Importa el modelo Type


// petición a fuentes externas
// URL límite 50 pokemon
const URL = `https://pokeapi.co/api/v2/pokemon`;

const getAllPokemons = async () => {
     try {
     // Obtener pokemons desde la base de datos
    const pokemonsDB = await Pokemon.findAll({
      include: [
        {
          model: Type,
          attributes: ["name"],
          through: { attributes: [] }
        }
      ]
    })

    // obtener pokemons desde la API
    const allPokemons = await axios.get(`${URL}?offset=0&limit=50`)
    
    const allPokemonsFromAPI = allPokemons.data.results

    const finalresponse = [...pokemonsDB,
       ...allPokemonsFromAPI];
    return finalresponse;

    } catch (error) {
    console.error("Error en getPokemonsControllers", error);
    throw error;
    }
}

 const getPokemonData = async(pokemonName) => {

  try {
    const response = await axios.get(`${URL}/${pokemonName}`);
    const pokemonData = {
      id: response.data?.id,


      name: response.data?.name,
      image: response.data?.sprites.front_default,
      hp: response.data?.stats.find((stat) => stat.stat.name === "hp").base_stat,
      attack: response.data?.stats.find((stat) => stat.stat.name === "attack").base_stat,
      defense: response.data?.stats.find((stat) => stat.stat.name === "defense").base_stat,
      speed: response.data?.stats.find((stat) => stat.stat.name === "speed").base_stat,
      height: response.data?.height,
      weight: response.data?.weight,
      types: response.data?.types.map((type) => type.type.name).join(` / `)
    };

    return [pokemonData, "Aqui estoy!"] ;
  } catch (error) {
    console.error("Error al obtener datos del Pokemon por nombre", error);
    throw error;
  }
}

// Función principal que utiliza getAllPokemons y getPokemonData
 const processPokemon = async() => {
  try {
    const pokemons = await getAllPokemons();

    // Utilizar map para obtener los datos de cada Pokémon
    const pokemonDataArray = await Promise.all(
      pokemons.map(async (Pokemon) => {
        return await getPokemonData(Pokemon.name);
      })
    );

    // Devolver los datos finales
    return pokemonDataArray;
  } catch (error) {
    console.error("Error al procesar los Pokémon:", error);
    throw error;
  }
}

//! dudas, es necesario volver a definir pokemon data cada vez que quiera filtrar en la búsqueda?

const getPokemonID = async(pokemonID) => {

  try {
    const response = await axios.get(`${URL}/${pokemonID}`);
    const pokemonData = {
      id: response?.data.id,
      name: response?.data.name,
      image: response?.data.sprites.front_default,
      hp: response?.data.stats.find((stat) => stat.stat.name === "hp").base_stat,
      attack: response?.data.stats.find((stat) => stat.stat.name === "attack").base_stat,
      defense: response?.data.stats.find((stat) => stat.stat.name === "defense").base_stat,
      speed: response?.data.stats.find((stat) => stat.stat.name === "speed").base_stat,
      height: response?.data.height,
      weight: response?.data.weight,
      types: response?.data.types.map((type) => type.type.name).join(` / `)
    };

    return pokemonData;
  } catch (error) {
    console.error("Error al obtener datos del Pokemon  por ID", error);
    throw error;
  }
}

const postPokemonCreate = async ({ name, image, hp, attack, defense, speed, height, weight, types }, res) => {
  try {

    // Crear el Pokémon en la base de datos
    const createdPokemon = await Pokemon.create({
      name,
      image,
      hp,
      attack,
      defense,
      speed,
      height,
      weight
    }
    );

    // Obtener las instancias de tipos correspondientes a los tipos seleccionados
    const typeInstances = await Type.findAll({
      where: { name:  types },
    });

    // Asociar los tipos al Pokémon recién creado
    await createdPokemon.setTypes(typeInstances);

    return ("Pokemon correctamente creado")
  } catch (error) {
    console.error("Error al crear el Pokemon", error);
    throw error;
  }
};




        

module.exports = { 
    getAllPokemons,
    getPokemonData,
    processPokemon,
    getPokemonID,
    postPokemonCreate
   };
    
    


//! handle que hace la petición al controller
//! controller que hace la petición a la API y devuelve la respuesta

