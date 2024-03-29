
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const sequelize = require('./database.js');
const Formulario = require('./relacion.js');
const app = express();
const port = 3001;
app.use(bodyParser.json());
app.use(cors());
 
app.post('/newData', (req, res) => {
    const { id, nombre, email, telefono, opcion } = req.body;
    
    Formulario.create({
      id: id,
      nombre: nombre,
      email: email,
      telefono: telefono,
      opcion: opcion
    })
    .then(result => {
      res.status(201).json({ message: 'Datos agregados con éxito' });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ error: err.message });
    });
  });
  
  app.get('/consulta', async (req, res) => {
    try{
      const resultados = await Formulario.findAll();
      res.json(resultados);
    } catch(err){
      res.status(500).json({ error: 'Error al realizar la consulta' });
    }
  });
  
  sequelize.sync()
  .then(() => {
    console.log('Base de datos sincronizada');
  })
  .catch(err => {
    console.error('Error al sincronizar la base de datos:', err);
  });
app.listen(port, () => {
    console.log(`Servidor corriendo en http://localhost:${port}`);
  });