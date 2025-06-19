const express = require('express');
const router = express.Router();
const { User } = require('../models');

router.post('/register', async (req, res) => {
  console.log("🚀 Dados recebidos:", req.body);
  
  try {
    const user = await User.create(req.body);
    res.status(201).json(user);
  } catch (err) {
    console.error("❌ Erro ao criar utilizador:", err);
    res.status(400).json({ erro: err.message });
  }
});
router.get('/users', async (req, res) => {
  try {
    const users = await User.findAll({
      attributes: { exclude: ['password', 'resetPasswordToken', 'resetPasswordExpires'] }
    });
    res.json(users);
  } catch (err) {
    console.error("❌ Erro ao buscar utilizadores:", err);
    res.status(500).json({ erro: err.message });
  }
});

router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  const user = await User.scope('withPassword').findOne({ where: { email } });

  if (!user || !(await user.comparePassword(password))) {
    return res.status(401).json({ message: 'Credenciais inválidas' });
  }

  const token = user.generateJWT();
  res.json({ token });
});

module.exports = router;
