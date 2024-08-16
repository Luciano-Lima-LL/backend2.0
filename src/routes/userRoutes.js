const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

router.post('/v1/user', userController.createUser);
router.put('/v1/user/:id', userController.updateUser);
router.get('/v1/user/:id', userController.getUserById);
router.delete('/v1/user/:id', userController.deleteUser);

module.exports = router;
