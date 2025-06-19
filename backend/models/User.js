// models/User.js
const { DataTypes } = require('sequelize');
const bcrypt = require('bcryptjs');
const { sequelize } = require('../config/database');

const User = sequelize.define('User', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: { msg: 'O nome é obrigatório' },
      len: { args: [2, 100], msg: 'O nome deve ter entre 2 e 100 caracteres' }
    }
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: { msg: 'Este email já está em uso' },
    validate: {
      isEmail: { msg: 'Por favor, forneça um email válido' },
      notEmpty: { msg: 'O email é obrigatório' }
    }
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: { msg: 'A senha é obrigatória' },
      len: { args: [6, 100], msg: 'A senha deve ter no mínimo 6 caracteres' }
    }
  },
  role: {
    type: DataTypes.ENUM('admin', 'receptionist', 'guest'),
    defaultValue: 'guest',
    validate: {
      isIn: {
        args: [['admin', 'receptionist', 'guest']],
        msg: 'Função inválida'
      }
    }
  },
  resetPasswordToken: DataTypes.STRING,
  resetPasswordExpires: DataTypes.DATE
}, {
  timestamps: true,
  hooks: {
    beforeSave: async (user) => {
      if (user.changed('password')) {
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(user.password, salt);
      }
    }
  },
  defaultScope: {
    attributes: {
      exclude: ['password', 'resetPasswordToken', 'resetPasswordExpires']
    }
  },
  scopes: {
    withPassword: {
      attributes: { include: ['password'] }
    },
    withResetToken: {
      attributes: { include: ['resetPasswordToken', 'resetPasswordExpires'] }
    }
  }
});

User.prototype.comparePassword = async function(candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

User.prototype.generateJWT = function() {
  const jwt = require('jsonwebtoken');
  return jwt.sign(
    {
      userId: this.id,
      role: this.role,
      name: this.name
    },
    process.env.JWT_SECRET,
    { expiresIn: '24h' }
  );
};

User.prototype.createPasswordResetToken = async function() {
  const crypto = require('crypto');
  const resetToken = crypto.randomBytes(32).toString('hex');
  
  this.resetPasswordToken = crypto.createHash('sha256').update(resetToken).digest('hex');
  this.resetPasswordExpires = Date.now() + 10 * 60 * 1000;
  
  await this.save();
  return resetToken;
};

module.exports = User;
