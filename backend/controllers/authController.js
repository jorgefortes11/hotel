const jwt = require('jsonwebtoken');
const { User } = require('../models');
const { validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');

exports.register = async (req, res) => {
  // Validação dos campos
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { name, email, password, role } = req.body;

  try {
    // Verifica se o usuário já existe
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ error: 'Email já está em uso' });
    }

    // Cria o usuário (o hook no modelo fará o hash da senha)
    const user = await User.create({ 
      name, 
      email, 
      password,
      role: role || 'guest' // Define 'guest' como padrão se não especificado
    });

    // Gera token JWT
    const token = jwt.sign(
      { 
        userId: user.id, 
        role: user.role,
        name: user.name
      },
      process.env.JWT_SECRET,
      { expiresIn: '24h' }
    );

    // Remove a senha do objeto de resposta
    const userResponse = user.get();
    delete userResponse.password;

    res.status(201).json({ 
      token,
      user: userResponse
    });

  } catch (error) {
    console.error('Erro no registro:', error);
    res.status(500).json({ 
      error: 'Erro no servidor',
      details: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

exports.login = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { email, password } = req.body;

  try {
    // Busca usuário incluindo a senha (normalmente excluída nas queries)
    const user = await User.scope('withPassword').findOne({ 
      where: { email } 
    });

    if (!user) {
      return res.status(401).json({ error: 'Credenciais inválidas' });
    }

    // Compara senhas usando o método do modelo
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ error: 'Credenciais inválidas' });
    }

    // Gera token JWT
    const token = jwt.sign(
      { 
        userId: user.id,
        role: user.role,
        name: user.name
      },
      process.env.JWT_SECRET,
      { expiresIn: '24h' }
    );

    // Remove a senha do objeto de resposta
    const userResponse = user.get();
    delete userResponse.password;

    res.json({ 
      token,
      user: userResponse
    });

  } catch (error) {
    console.error('Erro no login:', error);
    res.status(500).json({ 
      error: 'Erro no servidor',
      details: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};


exports.getMe = async (req, res) => {
  try {
    const user = await User.findByPk(req.user.userId, {
      attributes: { exclude: ['password'] } // Exclui a senha
    });

    if (!user) {
      return res.status(404).json({ error: 'Usuário não encontrado' });
    }

    res.json(user);
  } catch (error) {
    console.error('Erro ao buscar usuário:', error);
    res.status(500).json({ error: 'Erro no servidor' });
  }
};