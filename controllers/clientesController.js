const Clientes = require('../models/clientesModel');

// Criar um novo cliente
exports.criarCliente = async (req, res) => {
  try {
    const { nome, sobrenome, email, idade } = req.body;

    // Validação da idade
    if (idade < 0 || idade > 99) {
      return res.status(400).json({ message: 'Idade deve ser entre 0 e 99.' });
    }

    const cliente = await Clientes.create(req.body);
    res.status(201).json(cliente);
  } catch (err) {
    res.status(500).json({ message: 'Erro ao criar cliente', error: err });
  }
};

// Obter todos os clientes
exports.getClientes = async (req, res) => {
  try {
    const clientes = await Clientes.findAll();
    res.status(200).json(clientes);
  } catch (err) {
    res.status(500).json({ message: 'Erro ao buscar clientes', error: err });
  }
};

// Obter um cliente pelo ID
exports.getClienteById = async (req, res) => {
  try {
    const cliente = await Clientes.findByPk(req.params.id);
    if (!cliente) {
      return res.status(404).json({ message: 'Cliente não encontrado' });
    }
    res.status(200).json(cliente);
  } catch (err) {
    res.status(500).json({ message: 'Erro ao buscar cliente', error: err });
  }
};

// Atualizar um cliente
exports.atualizarCliente = async (req, res) => {
  try {
    const { idade } = req.body;

    // Validação da idade
    if (idade < 0 || idade > 99) {
      return res.status(400).json({ message: 'Idade deve ser entre 0 e 99.' });
    }

    const cliente = await Clientes.update(req.body, {
      where: { id: req.params.id }
    });
    if (!cliente[0]) {
      return res.status(404).json({ message: 'Cliente não encontrado' });
    }
    res.status(200).json({ message: 'Cliente atualizado com sucesso' });
  } catch (err) {
    res.status(500).json({ message: 'Erro ao atualizar cliente', error: err });
  }
};

// Remover um cliente
exports.removerCliente = async (req, res) => {
  try {
    const cliente = await Clientes.destroy({
      where: { id: req.params.id }
    });
    if (!cliente) {
      return res.status(404).json({ message: 'Cliente não encontrado' });
    }
    res.status(200).json({ message: 'Cliente removido com sucesso' });
  } catch (err) {
    res.status(500).json({ message: 'Erro ao remover cliente', error: err });
  }
};
