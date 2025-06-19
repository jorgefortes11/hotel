const { DataTypes } = require('sequelize');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { sequelize } = require('../config/database');


const User = sequelize.define('User', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: { msg: 'O nome é obrigatório' }
    }
  },
  email: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false,
    validate: {
      isEmail: { msg: 'Email inválido' }
    }
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
  },
  role: {
    type: DataTypes.ENUM('admin', 'receptionist', 'guest', 'client'), // ✅ Corrigido
    allowNull: false,
    defaultValue: 'guest',
    validate: {
      isIn: {
        args: [['admin', 'receptionist', 'guest', 'client']],
        msg: 'Função inválida'
      }
    }
  }
}, {
  defaultScope: {
    attributes: { exclude: ['password'] }
  },
  scopes: {
    withPassword: {
      attributes: {}
    }
  },
  hooks: {
    beforeCreate: async (user) => {
      if (user.password) {
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(user.password, salt);
      }
    }
  }
});

// 👉 Método para verificar password
User.prototype.comparePassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

// 👉 Método para gerar JWT
User.prototype.generateJWT = function () {
  return jwt.sign(
    { userId: this.id, role: this.role, name: this.name },
    process.env.JWT_SECRET || 'segredo',
    { expiresIn: '24h' }
  );
};

module.exports = User;
