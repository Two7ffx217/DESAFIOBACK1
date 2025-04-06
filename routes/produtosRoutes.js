const express = require('express');
const router = express.Router();
const Produto = require('../models/produtosModel');

// Middleware para validação de produto
const validarProduto = (req, res, next) => {
  const { nome, preco } = req.body;

  if (!nome || !preco) {
    return res.status(400).json({ 
      success: false,
      error: 'Nome e preço são obrigatórios',
      fields: {
        nome: !nome ? 'Campo obrigatório' : undefined,
        preco: !preco ? 'Campo obrigatório' : undefined
      }
    });
  }

  if (isNaN(preco) || preco <= 0) {
    return res.status(400).json({ 
      success: false,
      error: 'O preço deve ser um número positivo'
    });
  }

  next();
};

// Listar todos os produtos
const listarProdutos = async (req, res) => {
  try {
    const produtos = await Produto.findAll({
      order: [['data_atualizado', 'DESC']]
    });

    res.json({
      success: true,
      count: produtos.length,
      data: produtos
    });
  } catch (error) {
    console.error('Erro ao listar produtos:', error);
    res.status(500).json({ 
      success: false,
      error: 'Erro ao listar produtos',
      details: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

// Buscar produto por ID
const buscarProdutoPorId = async (req, res) => {
  try {
    const { id } = req.params;
    const produto = await Produto.findByPk(id);

    if (!produto) {
      return res.status(404).json({ 
        success: false,
        error: 'Produto não encontrado'
      });
    }

    res.json({
      success: true,
      data: produto
    });
  } catch (error) {
    console.error('Erro ao buscar produto por ID:', error);
    res.status(500).json({ 
      success: false,
      error: 'Erro ao buscar produto por ID',
      details: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

// Criar novo produto
const criarProduto = async (req, res) => {
  try {
    const { nome, preco, descricao } = req.body;

    const produto = await Produto.create({
      nome,
      preco,
      descricao: descricao || null,
      data_atualizado: new Date()
    });

    res.status(201).json({
      success: true,
      message: 'Produto criado com sucesso',
      data: produto
    });
  } catch (error) {
    console.error('Erro ao criar produto:', error);
    res.status(500).json({ 
      success: false,
      error: 'Erro ao criar produto',
      details: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

// Editar produto existente
const editarProduto = async (req, res) => {
  try {
    const { id } = req.params;
    const { nome, preco, descricao } = req.body;

    const produto = await Produto.findByPk(id);

    if (!produto) {
      return res.status(404).json({ 
        success: false,
        error: 'Produto não encontrado'
      });
    }

    // Atualiza apenas os campos fornecidos
    const atualizacoes = {
      nome,
      preco,
      descricao: descricao !== undefined ? descricao : produto.descricao,
      data_atualizado: new Date()
    };

    await produto.update(atualizacoes);

    res.json({
      success: true,
      message: 'Produto atualizado com sucesso',
      data: produto
    });
  } catch (error) {
    console.error('Erro ao editar produto:', error);
    res.status(500).json({ 
      success: false,
      error: 'Erro ao editar produto',
      details: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

// Deletar produto
const deletarProduto = async (req, res) => {
  try {
    const { id } = req.params;

    const produto = await Produto.findByPk(id);

    if (!produto) {
      return res.status(404).json({ 
        success: false,
        error: 'Produto não encontrado'
      });
    }

    await produto.destroy();

    res.status(200).json({
      success: true,
      message: 'Produto deletado com sucesso'
    });
  } catch (error) {
    console.error('Erro ao deletar produto:', error);
    res.status(500).json({ 
      success: false,
      error: 'Erro ao deletar produto',
      details: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

// Rotas com validação
router.get('/', listarProdutos);
router.get('/:id', buscarProdutoPorId); // ✅ nova rota para buscar por ID
router.post('/', validarProduto, criarProduto);
router.put('/:id', validarProduto, editarProduto);
router.delete('/:id', deletarProduto);

module.exports = router;
