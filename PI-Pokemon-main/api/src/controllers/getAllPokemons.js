const axios = require("axios");
const { Pokemon, Type } = require("../db")

// petición a fuentes externas
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

    const processedPokemonsDB = pokemonsDB.map((pokemon) => ({
      ...pokemon.toJSON(),
      types: pokemon.Types.map((type) => type.name), // Extraer solo los nombres de los tipos
    }));
    const pokemonsDBFlat = processedPokemonsDB.flat()

   // obtener pokemons desde la API
    const allPokemons = await axios.get(`${URL}?offset=0&limit=50`)
    const allPokemonsFromAPI = allPokemons.data.results
    const allPokemonsFromAPIFlat = allPokemonsFromAPI.flat()

    const finalresponse = pokemonsDBFlat.concat(allPokemonsFromAPIFlat);
    return finalresponse
    
    } catch (error) {
    console.error("Error en getPokemonsControllers", error);
    throw error;
    }
}

 const getPokemonData = async(pokemonName) => {

  let pokemonData;

  try {
    const responseDB = await Pokemon.findOne({ 
        where: { name: pokemonName },
        include: [
        {
          model: Type,
          attributes: ["name"],
          through: { attributes: [] }
        }
      ]});
      if (responseDB) {
      // Si responseDB está definido y no es nulo, usar sus datos
      return pokemonData = {
        id: responseDB.id,
        name: responseDB.name,
        image: responseDB.image,
        hp: responseDB.hp,
        attack: responseDB.attack,
        defense: responseDB.defense,
        speed: responseDB.speed,
        height: responseDB.height,
        weight: responseDB.weight,
        types: responseDB.Types.map(type => type.name).join(` / `)
      };
    } else {
      const response = await axios.get(`${URL}/${pokemonName}`);
       return pokemonData = {
        id: response.data?.id,
        name: response.data?.name,
        image: response.data?.sprites.front_default,
        hp: response.data?.stats.find((stat) => stat.stat.name === "hp").base_stat,
        attack: response.data?.stats.find((stat) => stat.stat.name === "attack").base_stat,
        defense: response.data?.stats.find((stat) => stat.stat.name === "defense").base_stat,
        speed: response.data?.stats.find((stat) => stat.stat.name === "speed").base_stat,
        height: response.data?.height,
        weight: response.data?.weight,
        types: response.data?.types.map((type) => type.type.name)
      };
    }

  } catch (error) {
    console.error("Error al obtener datos del Pokemon por nombre", error);
    throw error;
  }
}

// Función principal que utiliza getAllPokemons y getPokemonData
 const processPokemon = async() => {
  try {
    const pokemons = await getAllPokemons();
    const arrayDB = pokemons.filter((poke)=> poke.id)
    const arrayAPI = pokemons.filter((poke)=>(poke.url))

    // Utilizar map para obtener los datos de cada Pokémon
    const pokemonDataArray = await Promise.all(
      arrayAPI.map(async (Pokemon) => {
        return await getPokemonData(Pokemon.name);
      })
    );

    // Devolver los datos finales
    return arrayDB.concat(pokemonDataArray.flat())
  } catch (error) {
    console.error("Error al procesar los Pokémon:", error);
    throw error;
  }
}

const getPokemonID = async(pokemonID) => {

  let pokemonData;

  try {  
      // Verificar si responseDB contiene la información
      if (isNaN(pokemonID)) {
        const responseDB = await Pokemon.findByPk(pokemonID, { 
          include: [
          {
            model: Type,
            attributes: ["name"],
            through: { attributes: [] }
          }
        ]});
        // Si responseDB está definido y no es nulo, usar sus datos
        return pokemonData = {
          id: responseDB.id,
          name: responseDB.name,
          image: responseDB.image,
          hp: responseDB.hp,
          attack: responseDB.attack,
          defense: responseDB.defense,
          speed: responseDB.speed,
          height: responseDB.height,
          weight: responseDB.weight,
          types: responseDB.Types.map(type => type.name).join(` / `)
        };
      } else {
        const responseAPI = await axios.get(`${URL}/${pokemonID}`);
        // Si responseDB no contiene la información, obtener los datos de responseAPI
        return pokemonData = {
          id: responseAPI.data.id,
          name: responseAPI.data.name,
          image: responseAPI.data.sprites.front_default,
          hp: responseAPI.data.stats.find((stat) => stat.stat.name === "hp").base_stat,
          attack: responseAPI.data.stats.find((stat) => stat.stat.name === "attack").base_stat,
          defense: responseAPI.data.stats.find((stat) => stat.stat.name === "defense").base_stat,
          speed: responseAPI.data.stats.find((stat) => stat.stat.name === "speed").base_stat,
          height: responseAPI.data.height,
          weight: responseAPI.data.weight,
          types: responseAPI.data.types.map((type) => type.type.name).join(` / `)
        };
      }
    
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
const algo = await Type.findAll({where : {id: types}});
    console.log("Types:", types)
      // Asociar el tipo al Pokémon
      await createdPokemon.addType(algo);
  
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

