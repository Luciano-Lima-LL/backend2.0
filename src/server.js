const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const sequelize = require('./config/database'); 
require('dotenv').config(); 

app.use(express.json()); 
app.use(bodyParser.json());

require('./routes/userRoutes');  

app.get('/', (req, res) => {
  res.send('EAE MUNDÃO'); 
});

sequelize.sync()
  .then(() => {
    app.listen(3000, () => {
      console.log('Servidor rodando na porta 3000');
    });
  })
  .catch((error) => {
    console.error('Erro ao conectar com o banco de dados:', error);
  });

module.exports = app
