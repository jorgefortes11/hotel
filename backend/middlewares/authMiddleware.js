const jwt = require('jsonwebtoken');
const { User } = require('../models');

module.exports = async (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ erro: 'Token ausente' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findByPk(decoded.userId);
    if (!user) return res.status(401).json({ erro: 'Utilizador não encontrado' });

    req.user = user;
    next();
  } catch (err) {
    res.status(403).json({ erro: 'Token inválido' });
  }
};
