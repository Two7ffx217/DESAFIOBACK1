require('dotenv').config(); // Carrega as variáveis do .env
const { Sequelize } = require('sequelize');

// Configuração de conexão com o banco de dados MySQL
const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
  host: process.env.DB_HOST,
  dialect: 'mysql',
  port: process.env.DB_PORT,
  logging: false,
  ssl: true, // Se necessário
});

// Testando a conexão
sequelize.authenticate()
  .then(() => {
    console.log('✅ Conexão com o banco de dados foi bem-sucedida!');
  })
  .catch((error) => {
    console.error('❌ Erro na conexão com o banco de dados:', error);
  });

module.exports = sequelize;
