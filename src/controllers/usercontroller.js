const User = require('../models/User'); 

const getUserById = async (req, res) => {
  try {
    const userId = req.params.id; 
    const user = await User.findByPk(userId);

    if (user) {
      res.json({
        id: user.id,
        firstname: user.firstname,
        surname: user.surname,
        email: user.email
      });
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    console.error('Error fetching user:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

module.exports = {
  getUserById
};
