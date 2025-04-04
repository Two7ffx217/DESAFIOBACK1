// Importando a configuração do banco de dados
const db = require('../config/dbConfig');

// Função para listar todos os produtos
exports.listarProdutos = () => {
  return new Promise((resolve, reject) => {
    db.query('SELECT * FROM produtos', (err, results) => {
      if (err) {
        reject(err);  // Rejeita a promessa em caso de erro
      }
      resolve(results);  // Resolve a promessa com os resultados
    });
  });
};

// Função para adicionar um produto
exports.adicionarProduto = (nome, descricao, preco) => {
  return new Promise((resolve, reject) => {
    const query = 'INSERT INTO produtos (nome, descricao, preco, data_atualizado) VALUES (?, ?, ?, NOW())';
    db.query(query, [nome, descricao, preco], (err, results) => {
      if (err) {
        reject(err);  // Rejeita a promessa em caso de erro
      }
      resolve(results);  // Resolve a promessa com os resultados (como o ID do novo produto)
    });
  });
};

// Função para atualizar um produto
exports.atualizarProduto = (id, nome, descricao, preco) => {
  return new Promise((resolve, reject) => {
    const query = 'UPDATE produtos SET nome = ?, descricao = ?, preco = ?, data_atualizado = NOW() WHERE id = ?';
    db.query(query, [nome, descricao, preco, id], (err, results) => {
      if (err) {
        reject(err);  // Rejeita a promessa em caso de erro
      }
      resolve(results);  // Resolve a promessa com o número de linhas afetadas
    });
  });
};

// Função para deletar um produto
exports.deletarProduto = (id) => {
  return new Promise((resolve, reject) => {
    const query = 'DELETE FROM produtos WHERE id = ?';
    db.query(query, [id], (err, results) => {
      if (err) {
        reject(err);  // Rejeita a promessa em caso de erro
      }
      resolve(results);  // Resolve a promessa com o número de linhas afetadas
    });
  });
};
