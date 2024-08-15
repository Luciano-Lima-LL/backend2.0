const express = require('express');
const app = express();
const sequelize = require('./config/database'); 
require('dotenv').config(); 

app.use(express.json()); 


app.get('/', (req, res) => {
  res.send('EAE MUNDÃO'); 
});

const category = require('./models/Category');
const product = require('./models/Product');
const user = require('./models/user');
const image = require('./models/Image');
const option = require('./models/Option');
const productCategory = require('./models/ProductCategory');
const userRoutes = require('./routes/userRoutes');


sequelize.sync()
  .then(() => {
    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
      console.log(`Servidor rodando na porta ${PORT}`);
    });
  })
  .catch(error => {
    console.error('Erro ao conectar ou sincronizar com o banco de dados:', error);
  });
