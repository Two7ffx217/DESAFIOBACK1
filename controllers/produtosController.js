const Produto = require('../models/produtosModel');

// Função para listar todos os produtos com mais detalhes
const listarProdutos = async (req, res) => {
  try {
    const produtos = await Produto.findAll();
    if (produtos.length === 0) {
      return res.status(404).json({ message: 'Nenhum produto encontrado.' });
    }
    res.json(produtos);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao listar produtos' });
  }
};

// Função para criar um novo produto com validação de dados
const criarProduto = async (req, res) => {
  const { nome, preco } = req.body;

  // Validação simples
  if (!nome || !preco) {
    return res.status(400).json({ error: 'Nome e preço são obrigatórios.' });
  }

  try {
    const produto = await Produto.create({ nome, preco });
    res.status(201).json(produto);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao criar produto' });
  }
};

module.exports = {
  listarProdutos,
  criarProduto
};
