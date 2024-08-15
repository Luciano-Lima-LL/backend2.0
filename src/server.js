const express = require('express');
const app = express();
const sequelize = require('./config/database'); 
require('dotenv').config(); 

app.use(express.json()); 

// Importa os modelos para garantir que são carregados
const Category = require('./models/Category');
const Product = require('./models/Product');
const user = require('./models/user');  // Corrigido para 'User' com 'U' maiúsculo
const Image = require('./models/Image');
const Option = require('./models/Option');
const ProductCategory = require('./models/ProductCategory');

// Importa as rotas do usuário
const userRoutes = require('./routes/userRoutes');

// Configura a rota base
app.use('/api', userRoutes);

app.get('/', (req, res) => {
  res.send('EAE MUNDÃO'); 
});

// Sincroniza o banco de dados e inicia o servidor
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
