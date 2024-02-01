const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
sequelize.define('Type', {
    id: { 
      type: DataTypes.UUID,
      primaryKey: true,
      allowNull: false,
      defaultValue: DataTypes.UUIDV4
    },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  } }, {
    // Agregar configuración adicional aquí
    tableName: 'Type', // Nombre exacto de la tabla en la base de datos
    timestamps: false, // Si las columnas "createdAt" y "updatedAt" existen en la tabla o no

})
};

