const express = require('express');
const app = express();
const sequelize = require('./config/database');
require('dotenv').config();

app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello World!');
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  sequelize.authenticate()
    .then(() => console.log('Database connected'))
    .catch(err => console.error('Unable to connect to the database:', err));
});
