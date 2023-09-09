const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('postgres://db_project123:64ug75opRFKjpECxNGGJFLQFwYQuVvAr@dpg-cjtqjavhdsdc73e3nk8g-a.oregon-postgres.render.com/mi_base_datos',{
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false // <-- Esto es importante para evitar errores de certificado auto-firmado.
    }
  }
});

sequelize.authenticate()
  .then(() => {
    console.log('Conexión establecida con éxito.');
  })
  .catch(err => {
    console.error('No se pudo conectar a la base de datos:', err);
  });
module.exports = sequelize;