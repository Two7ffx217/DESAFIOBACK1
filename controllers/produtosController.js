const Produto = require('../models/produtosModel');

// Função para listar todos os produtos
const listarProdutos = async (req, res) => {
  try {
    const produtos = await Produto.findAll({
      order: [['data_atualizado', 'DESC']]  // Ordena por data decrescente
    });
    
    if (produtos.length === 0) {
      return res.status(404).json({ message: 'Nenhum produto encontrado.' });
    }
    
    res.json(produtos);
  } catch (error) {
    console.error('Erro ao listar produtos:', error);
    res.status(500).json({ 
      error: 'Erro ao listar produtos',
      details: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

// Função para buscar produto por ID
const listarProdutoPorId = async (req, res) => {
  const { id } = req.params;

  try {
    const produto = await Produto.findByPk(id);
    
    if (!produto) {
      return res.status(404).json({ 
        message: `Produto com ID ${id} não encontrado.` 
      });
    }
    
    res.json(produto);
  } catch (error) {
    console.error(`Erro ao buscar produto ID ${id}:`, error);
    res.status(500).json({ 
      error: 'Erro ao buscar produto',
      details: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

// Função para criar novo produto
const criarProduto = async (req, res) => {
  const { nome, preco, descricao } = req.body;

  // Validação melhorada
  if (!nome || !preco) {
    return res.status(400).json({ 
      error: 'Campos obrigatórios faltando',
      required: ['nome', 'preco']
    });
  }

  try {
    const produto = await Produto.create({ 
      nome,
      preco,
      descricao: descricao || null,
      data_atualizado: new Date()  // Garante a data de criação
    });
    
    res.status(201).json(produto);
  } catch (error) {
    console.error('Erro ao criar produto:', error);
    res.status(500).json({ 
      error: 'Erro ao criar produto',
      details: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

// Função para atualizar produto
const atualizarProduto = async (req, res) => {
  const { id } = req.params;
  const { nome, preco, descricao } = req.body;

  try {
    const produto = await Produto.findByPk(id);
    
    if (!produto) {
      return res.status(404).json({ 
        message: `Produto com ID ${id} não encontrado.` 
      });
    }

    // Atualiza apenas os campos fornecidos
    const camposAtualizados = {
      ...(nome && { nome }),
      ...(preco && { preco }),
      ...(descricao !== undefined && { descricao }),
      data_atualizado: new Date()  // Sempre atualiza a data
    };

    await produto.update(camposAtualizados);
    res.json(produto);
  } catch (error) {
    console.error(`Erro ao atualizar produto ID ${id}:`, error);
    res.status(500).json({ 
      error: 'Erro ao atualizar produto',
      details: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

// Função para remover produto
const removerProduto = async (req, res) => {
  const { id } = req.params;

  try {
    const produto = await Produto.findByPk(id);
    
    if (!produto) {
      return res.status(404).json({ 
        message: `Produto com ID ${id} não encontrado.` 
      });
    }

    await produto.destroy();
    res.status(204).send();
  } catch (error) {
    console.error(`Erro ao remover produto ID ${id}:`, error);
    res.status(500).json({ 
      error: 'Erro ao remover produto',
      details: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

module.exports = {
  listarProdutos,
  listarProdutoPorId,
  criarProduto,
  atualizarProduto,
  removerProduto
};