const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('mi_base_de_datos', 'postgres', 'Data123', {
  host: 'localhost',
  dialect: 'postgres'
});

sequelize.authenticate()
  .then(() => {
    console.log('Conexión establecida con éxito.');
  })
  .catch(err => {
    console.error('No se pudo conectar a la base de datos:', err);
  });
module.exports = sequelize;