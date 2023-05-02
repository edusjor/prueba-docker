


const express = require('express');
const app = express();

app.get('/', (req, res) => {
  res.send('Hola, bienvenido a mi API!');
});






app.listen(3000, () => {
  console.log('La API está corriendo en el puerto 3000');
});
  