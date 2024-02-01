require('dotenv').config();
const { Sequelize } = require('sequelize');
const { DB_USER, DB_PASSWORD, DB_HOST, DB_PORT} = process.env;
const PokemonModel = require("../src/models/Pokemon")
const TypeModel = require("../src/models/Type")

// URL ----> postgres://DB_USER:DB_PASSWORD@DB_HOST/pokemon
const sequelize = new Sequelize(
   // URL

   `postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}/pokemon`,

   { logging: true, native: false }
);

// ejecutar la función de los modelos.

PokemonModel(sequelize);

TypeModel(sequelize);

// Relaciona tus modelos aquí abajo
const { Pokemon, Type } = sequelize.models;

Pokemon.belongsToMany(Type, { through: 'PokemonxType' });
Type.belongsToMany(Pokemon, { through: 'PokemonxType' });

module.exports = {
  ...sequelize.models,
   conn: sequelize,
};