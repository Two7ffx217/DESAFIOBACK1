// Importando a configuração do banco de dados
const db = require('../config/dbConfig');

// Função para listar todos os clientes
exports.listarClientes = () => {
  return new Promise((resolve, reject) => {
    db.query('SELECT * FROM clientes', (err, results) => {
      if (err) {
        reject(err);  // Rejeita a promessa em caso de erro
      }
      resolve(results);  // Resolve a promessa com os resultados
    });
  });
};

// Função para adicionar um cliente
exports.adicionarCliente = (nome, sobrenome, email, idade) => {
  return new Promise((resolve, reject) => {
    const query = 'INSERT INTO clientes (nome, sobrenome, email, idade) VALUES (?, ?, ?, ?)';
    db.query(query, [nome, sobrenome, email, idade], (err, results) => {
      if (err) {
        reject(err);  // Rejeita a promessa em caso de erro
      }
      resolve(results);  // Resolve a promessa com os resultados (como o ID do novo cliente)
    });
  });
};

// Função para atualizar um cliente
exports.atualizarCliente = (id, nome, sobrenome, email, idade) => {
  return new Promise((resolve, reject) => {
    const query = 'UPDATE clientes SET nome = ?, sobrenome = ?, email = ?, idade = ? WHERE id = ?';
    db.query(query, [nome, sobrenome, email, idade, id], (err, results) => {
      if (err) {
        reject(err);  // Rejeita a promessa em caso de erro
      }
      resolve(results);  // Resolve a promessa com o número de linhas afetadas
    });
  });
};

// Função para deletar um cliente
exports.deletarCliente = (id) => {
  return new Promise((resolve, reject) => {
    const query = 'DELETE FROM clientes WHERE id = ?';
    db.query(query, [id], (err, results) => {
      if (err) {
        reject(err);  // Rejeita a promessa em caso de erro
      }
      resolve(results);  // Resolve a promessa com o número de linhas afetadas
    });
  });
};
