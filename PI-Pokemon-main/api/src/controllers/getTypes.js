const { Type } = require("../db"); // Importa el modelo Type desde tu archivo de base de datos (db.js)
const axios = require("axios");

// Controlador para obtener y almacenar los tipos de Pokémon
const getTypes = async () => {
  try {
    // Verificar si ya existen tipos en la base de datos
    const existingTypes = await Type.findAll();

    // Si ya existen tipos en la base de datos, simplemente devuelve esos tipos
    if (existingTypes.length > 0) {
      return existingTypes;
    }

    // Si no existen tipos en la base de datos, solicita los tipos desde la API
    const URL = `https://pokeapi.co/api/v2/type`;
    const response = await axios.get(URL);
    const typesFromAPI = response.data.results.map((type) => ({ name: type.name }));

    // Guardar tipos en la base de datos
    const createdTypes = await Type.bulkCreate(typesFromAPI);

    return createdTypes;
  } catch (error) {
    console.error('Error al obtener y guardar tipos:', error);
    throw error;
  }
};

module.exports = {
  getTypes
};
