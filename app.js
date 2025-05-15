require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');

const fs = require('fs');
const path = require('path');
const usersFilePath = path.join(__dirname, 'users.json');

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended:  true}));

const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => {
      res.send(`
           <h1>Curso expressJS V3</h1>
           <p>esto es una aplicacion node.js con expressJS</p>
           <p>Corre en el puerto ${PORT}<p/>
        `);
});

app.get('/users/:id', (req, res) => {
   const userId = req.params.id;
   res.send(`Mostrar informacion del usuario con ID: ${userId}`);
})

app.get('/search', (req, res)=> {
    const term = req.query.termino || 'No especificado';
    const category = req.query.categoria || 'Todas';
    res.send(`
       <h2>Resultados de Busqueda:</h2>
       <p>Termino: ${term}</p>
       <p>Categoria: ${category}</p>
    `)
})

app.post('/form', (req, res ) => {
   const name = req.body.nombre || 'Anónimo';
   const email = req.body.email || 'No proporcionado';
   res.json({
      message: 'Datos recibidos',
      data: {
         name,
         email
      }
   })
})

app.post('/api/data', (req, res) => {
  const data = req.body;

  if (!data || Object.keys(data).length === 0) {
     return res.status(400).json({eror: 'no se recibieron datos'});
  }

  res.status(201).json({
   message: 'Datos JSON recibidos',
   data
  })
})

app.get('/users', (req, res) => {
   fs.readFile(usersFilePath, 'utf-8', (err, data) => {
      if (err) {
         return res.status(500).json({ error: 'Error con la conexion de datos.' })
      }
      const users = JSON.parse(data);
      res.json(users);
   })
});

app.post('/users', (req, res) => {
   const newUser = req.body;
   // validacion de nombre
   if(!newUser.name || newUser.name.length < 3) {
      return res.status(400).json({error: 'El nombre debe tener al menos 3 caracteres'});
   }
   //validacion de email con expresion regular
   const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
   if (!newUser.email || !emailRegex.test(newUser.email)) {
      return res.status(400).json({error: 'El email no es valido'})
   }
   fs.readFile(usersFilePath, 'utf-8', (err, data) => {
      if (err) {
         return res.status(500).json({ error: 'Error con conexion de datos.'})
      }
      const users = JSON.parse(data);
      users.push(newUser);
      fs.writeFile(usersFilePath, JSON.stringify(users, null, 2), (err) => {
        if (err) {
          return res.status(500).json({error: 'Error al guardar el usuario.'})
        }
        res.status(201).json(newUser);
      })
   });
})
app.listen(PORT, () => {
    console.log(`Servidor: http://localhost:${PORT}`);
})
