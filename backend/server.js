
const app = require('./app');
const { sequelize } = require('./models');

const PORT = process.env.PORT || 5000;

sequelize.authenticate()
  .then(() => {
    console.log('Ligação à base de dados estabelecida.');
    return sequelize.sync();
  })
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Servidor a correr na porta ${PORT}`);
    });
  })
  .catch(err => {
    console.error('Erro ao ligar à base de dados:', err);
  });
console.log("🔐 JWT_SECRET carregado:", process.env.JWT_SECRET);
