const express = require('express');
const router = express.Router();  // Corrigido: Variável correta é 'router'
const userController = require('../controllers/userController');

// Definição das rotas
router.post('/v1/user', userController.createUser);
router.put('/v1/user/:id', userController.updateUser);
router.get('/v1/user/:id', userController.getUserById);

module.exports = router;
