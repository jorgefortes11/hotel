const express = require('express');
const bcrypt = require('bcrypt');
const router = express.Router();
const { User } = require('../models');

// 👉 Rota de login
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.scope('withPassword').findOne({ where: { email } });

    if (!user || !(await user.comparePassword(password))) {
      return res.status(401).json({ message: 'Credenciais inválidas' });
    }

    const token = user.generateJWT();
    res.json({ token, role: user.role });
  } catch (err) {
    console.error("Erro no login:", err);
    res.status(500).json({ message: 'Erro interno ao autenticar' });
  }
});
router.get('/users', async (req, res) => {
  try {
    const users = await User.findAll({
      attributes: ['id', 'name', 'email', 'role', 'createdAt']
    });
    res.json(users);
  } catch (error) {
    console.error('Erro ao buscar utilizadores:', error);
    res.status(500).json({ message: 'Erro ao obter utilizadores' });
  }
});
// 👉 Rota de registo (apenas role client)
router.post('/register', async (req, res) => {
  const { name, email, password } = req.body;
  const role = 'client'; // 👈 força o tipo de utilizador

  try {
    const existing = await User.findOne({ where: { email } });
    if (existing) {
      return res.status(400).json({ message: 'Email já está registado' });
    }


  const newUser = await User.create({
    name,
    email,
    password,
    role,
});

    res.status(201).json({ message: 'Conta criada com sucesso', user: newUser });
  } catch (err) {
    console.error("Erro ao criar utilizador:", err);
    res.status(500).json({ message: 'Erro ao criar utilizador', error: err.message });
  }
});

module.exports = router;
