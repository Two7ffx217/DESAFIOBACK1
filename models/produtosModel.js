const { DataTypes } = require('sequelize');
const sequelize = require('../configs/dbConfig'); // Importando a configuração do banco de dados

// Definindo o modelo Produto
const Produto = sequelize.define('Produto', {
  nome: {
    type: DataTypes.STRING,
    allowNull: false
  },
  preco: {
    type: DataTypes.FLOAT,
    allowNull: false
  }
}, {
  timestamps: false, // Se não desejar as colunas createdAt e updatedAt
  tableName: 'produtos' // Nome da tabela no banco de dados
});

// Se necessário, você pode sincronizar o modelo manualmente em uma parte específica do seu código, como na inicialização do servidor ou em migrações

module.exports = Produto; // Exportando o modelo para ser usado em outros arquivos
