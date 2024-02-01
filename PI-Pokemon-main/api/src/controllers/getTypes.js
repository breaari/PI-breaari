// const { Type } = require("../models/Type");
const { Type, Pokemon } = require("../db");
const axios = require("axios");
// Definir la URL de la API de tipos de Pokemon

// Controlador para obtener y almacenar los tipos de Pokemon
const getTypes = async () => {
  const URL = `https://pokeapi.co/api/v2/type`;
  try {
    // Obtener tipos de la API
    const response = await axios.get(URL);
    const typesFromAPI = response.data.results.map((type) => type.name);

    // Guardar tipos en la base de datos
    const createdTypes = await Type.bulkCreate(typesFromAPI.map((typeName) => ({ name: typeName })));

    return createdTypes;
  } catch (error) {
    console.error('Error al obtener y guardar tipos:', error);
    throw error;
  }
};

module.exports = {
  getTypes
};