const express = require('express');
const router = express.Router();

// Importando o controlador de clientes
const clientesController = require('../controllers/clientesController');

// Definindo as rotas para clientes
// Criar um novo cliente
router.post('/', clientesController.criarCliente);

// Obter todos os clientes
router.get('/', clientesController.getClientes);

// Obter um cliente pelo ID
router.get('/:id', clientesController.getClienteById);

// Atualizar um cliente
router.put('/:id', clientesController.atualizarCliente);

// Remover um cliente
router.delete('/:id', clientesController.removerCliente);

module.exports = router;
