const { DataTypes, UUIDV4, UUID } = require('sequelize');

// Definición del modelo

module.exports = (sequelize) => {
  sequelize.define('Pokemon', {
  id: {
    type: DataTypes.UUID,
      primaryKey: true,
      allowNull: false,
      defaultValue: DataTypes.UUIDV4
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  image: {
    type: DataTypes.STRING,
    allowNull: false
  },
  hp: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  attack: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  defense: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  speed: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  height: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  weight: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
},
{
  // Agregar configuración adicional aquí
  tableName: 'Pokemon', // Nombre exacto de la tabla en la base de datos
  timestamps: false, // Si las columnas "createdAt" y "updatedAt" existen en la tabla o no

});
};
