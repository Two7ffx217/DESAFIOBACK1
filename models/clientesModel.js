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
      min: 0, // Garantir que a idade seja um número inteiro positivo
      max: 99, // Garantir que a idade não seja maior que 99
      isInt: {
        args: true,
        msg: 'A idade deve ser um número inteiro.' // Mensagem customizada
      },
      idadeValida(value) {
        if (value < 0 || value > 99) {
          throw new Error('Idade deve ser entre 0 e 99.');
        }
      }
    }
  }
}, {
  timestamps: false, // Se não desejar as colunas createdAt e updatedAt
  tableName: 'clientes' // Nome da tabela no banco de dados
});

module.exports = Cliente; // Exportando o modelo para ser usado em outros arquivos
