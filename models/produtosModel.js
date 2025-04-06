const { DataTypes } = require('sequelize');
const sequelize = require('../configs/dbConfig');

const Produto = sequelize.define('Produto', {
  nome: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: {
        msg: 'O nome do produto é obrigatório'
      }
    }
  },
  preco: {
    type: DataTypes.FLOAT,
    allowNull: false,
    validate: {
      isFloat: {
        msg: 'O preço deve ser um número válido'
      },
      min: {
        args: [0],
        msg: 'O preço não pode ser negativo'
      }
    },
    get() {
      // Garante que o preço sempre retorne como número
      return parseFloat(this.getDataValue('preco'));
    }
  },
  descricao: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  data_atualizado: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW
  }
}, {
  timestamps: false,
  tableName: 'produtos',
  hooks: {
    beforeSave: (produto) => {
      // Garante que o preço seja salvo como número
      if (typeof produto.preco === 'string') {
        produto.preco = parseFloat(produto.preco);
      }
      produto.data_atualizado = new Date();
    }
  }
});

module.exports = Produto;