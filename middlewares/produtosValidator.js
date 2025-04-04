const { body, validationResult } = require('express-validator');

exports.validarProduto = [
  body('nome')
    .notEmpty().withMessage('Nome do produto é obrigatório'),
  body('preco')
    .isFloat({ min: 0 }).withMessage('Preço deve ser um número válido e positivo'),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  }
];
