require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');

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


app.listen(PORT, () => {
    console.log(`Servidor: http://localhost:${PORT}`);
})
