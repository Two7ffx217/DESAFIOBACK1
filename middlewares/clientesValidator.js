const { body, validationResult } = require('express-validator');

exports.validarCliente = [
  body('nome')
    .notEmpty().withMessage('Nome é obrigatório'),
  body('sobrenome')
    .notEmpty().withMessage('Sobrenome é obrigatório'),
  body('email')
    .isEmail().withMessage('Email inválido'),
  body('idade')
    .isInt({ min: 0 }).withMessage('Idade deve ser um número inteiro positivo'),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  }
];
