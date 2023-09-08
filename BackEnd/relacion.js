const {Sequelize, DataTypes} = require('sequelize');
const sequelize = require('./database');

class Formulario extends Sequelize.Model {}

Formulario.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  nombre: {
    type: DataTypes.STRING,
    allowNull: false
  },
  email: {
    type: DataTypes.STRING
  },
  telefono: {
    type: DataTypes.STRING
  },
  opcion: {
    type: DataTypes.BOOLEAN
  }
}, {
  sequelize,
  modelName: 'Formulario'
});

module.exports = Formulario;