const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const sequelize = require('./database.js');
const path = require('path');
const app = express();
const port = 3001;
app.use(bodyParser.json());
app.use(cors());
app.use(express.static(path.join(__dirname, '..', 'build')));
app.post('/agregarDatos', (req, res) => {
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
  app.get('/miPagina', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'build', 'index.html'));
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