const express = require('express');
const bcrypt = require('bcrypt');
const router = express.Router();
const { User } = require('../models');

// 👉 Criar novo utilizador
router.post('/register', async (req, res) => {
  const { name, email, password, role } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
      role,
    });
    res.status(201).json(newUser);
  } catch (err) {
    console.error("❌ Erro ao criar utilizador:", err);
    res.status(500).json({ message: 'Erro ao criar utilizador', error: err.message });
  }
});

// 👉 Login de utilizador
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.scope('withPassword').findOne({ where: { email } });

    if (!user || !(await user.comparePassword(password))) {
      return res.status(401).json({ message: 'Credenciais inválidas' });
    }

    const token = user.generateJWT();

    // ✅ Inclui role na resposta
    res.json({ token, role: user.role });
  } catch (err) {
    console.error("❌ Erro no login:", err);
    res.status(500).json({ message: 'Erro no login', error: err.message });
  }
});

// 👉 Listar todos os utilizadores (sem passwords)
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

module.exports = router;
