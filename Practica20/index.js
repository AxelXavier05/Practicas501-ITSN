const express = require('express');
const app = express();
const port = 3000;

app.get('/', (req, res) => {
  res.send('Hola Mundo en NodeJS');
});

app.get('/nosotros', (req, res) => {
  res.send('Estas en la sección Nosotros');
});

app.listen(port, () => {
  console.log(`Servidor escuchando en http://localhost:${port}`);
});
