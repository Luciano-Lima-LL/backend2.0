const User = require('../models/user');
const bcrypt = require('bcrypt');

// Função para criar um usuário
const createUser = async (req, res) => {
  const { firstname, surname, email, password, confirmPassword } = req.body;

  if (!firstname || !surname || !email || !password || password !== confirmPassword) {
    return res.status(400).json({ error: 'Dados inválidos ou senhas não coincidem' });
  }

  try {
    const userExists = await User.findOne({ where: { email } });
    if (userExists) {
      return res.status(400).json({ error: 'Email já cadastrado' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      firstname,
      surname,
      email,
      password: hashedPassword,
    });

    return res.status(201).json({
      id: newUser.id,
      firstname: newUser.firstname,
      surname: newUser.surname,
      email: newUser.email,
    });
  } catch (error) {
    return res.status(500).json({ error: 'Erro ao criar usuário' });
  }
};

// Função para atualizar um usuário
const updateUser = async (req, res) => {
  const { id } = req.params;
  const { firstname, surname, email } = req.body;

  if (!firstname || !surname || !email) {
    return res.status(400).json({ error: 'Dados inválidos' });
  }

  try {
    const user = await User.findByPk(id);
    if (!user) {
      return res.status(404).json({ error: 'Usuário não encontrado' });
    }

    user.firstname = firstname;
    user.surname = surname;
    user.email = email;

    await user.save();

    return res.status(204).send();  // No Content
  } catch (error) {
    return res.status(500).json({ error: 'Erro ao atualizar usuário' });
  }
};

// Função para obter um usuário por ID
const getUserById = async (req, res) => {
  const { id } = req.params;

  try {
    const user = await User.findByPk(id);
    if (!user) {
      return res.status(404).json({ error: 'Usuário não encontrado' });
    }

    return res.json(user);
  } catch (error) {
    return res.status(500).json({ error: 'Erro ao obter usuário' });
  }
};

module.exports = {
  createUser,
  updateUser,
  getUserById,
};
