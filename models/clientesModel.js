const { DataTypes } = require('sequelize');
const sequelize = require('../configs/dbConfig'); // Importando a configuração do banco de dados

// Definindo o modelo Cliente
const Cliente = sequelize.define('Cliente', {
  nome: {
    type: DataTypes.STRING,
    allowNull: false
  },
  sobrenome: {
    type: DataTypes.STRING,
    allowNull: false
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true, // Garantir que o email seja único
    validate: {
      isEmail: true // Validação para garantir que o formato do email seja válido
    }
  },
  idade: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: {
      min: 0 // Garantir que a idade seja um número inteiro positivo
    }
  }
}, {
  timestamps: false, // Se não desejar as colunas createdAt e updatedAt
  tableName: 'clientes' // Nome da tabela no banco de dados
});

// Se necessário, você pode sincronizar o modelo manualmente em uma parte específica do seu código, como na inicialização do servidor ou em migrações

module.exports = Cliente; // Exportando o modelo para ser usado em outros arquivos
