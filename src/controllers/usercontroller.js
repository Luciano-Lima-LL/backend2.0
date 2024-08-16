const User = require('../models/user');

const createUser = async (req, res) => {
  const { firstname, surname, email, password, confirmPassword } = req.body;

  if (!firstname || !surname || !email || !password || password !== confirmPassword) {
    return res.status(400).json({ error: 'Dados inválidos ou senhas não coincidem' });
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({ firstname, surname, email, password: hashedPassword });
    return res.status(201).json(newUser);
  } catch (error) {
    return res.status(500).json({ error: 'Erro ao criar usuário' });
  }
};

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
    return res.status(204).send();
  } catch (error) {
    return res.status(500).json({ error: 'Erro ao atualizar usuário' });
  }
};

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

const deleteUser = async (req, res) => {
  const { id } = req.params;

  try {
    const user = await User.findByPk(id);
    if (!user) {
      return res.status(404).json({ error: 'Usuário não encontrado' });
    }

    await user.destroy();
    return res.status(204).send();
  } catch (error) {
    return res.status(500).json({ error: 'Erro ao deletar usuário' });
  }
};

module.exports = {
  createUser,
  updateUser,
  getUserById,
  deleteUser,
};
