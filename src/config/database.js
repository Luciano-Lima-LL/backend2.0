// config/database.js
require('dotenv').config();
const { Sequelize } = require('sequelize');

// Cria uma instância do Sequelize para PostgreSQL
const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
  host: process.env.DB_HOST,
  dialect: 'postgres',
  logging: false, // Opcional: desativa logs SQL
});

// Testa a conexão com o banco de dados
sequelize.authenticate()
  .then(() => {
    console.log('Conectado com sucesso ao banco de dados.');
  })
  .catch(err => {
    console.error('Não foi possível conectar ao banco de dados:', err);
  });

module.exports = sequelize;
