const app = require('../server')
const userController = require('../controllers/userController');

app.post('/v1/user', userController.createUser);
app.put('/v1/user/:id', userController.updateUser);
app.get('/v1/user/:id', userController.getUserById);
app.delete('/v1/user/:id', userController.deleteUser);
