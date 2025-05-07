require('dotenv').config();
const express = require('express');
const app = express();

const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => {
      res.send(`
           <h1>Curso expressJS V6 perros</h1>
           <p>esto es una aplicacion node.js con expressJS</p>
           <p>Corre en el puerto ${PORT}<p/>
        `);
});

app.listen(PORT, () => {
    console.log(`Servidor: http://localhost:${PORT}`);
})
