const express = require('express');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const createError = require('http-errors');

// Importando as rotas
const clientesRoutes = require('./routes/clientesRoutes');
const produtosRoutes = require('./routes/produtosRoutes');

const app = express();

// Middlewares
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// Rotas
app.use('/clientes', clientesRoutes);
app.use('/produtos', produtosRoutes);

// Endpoint padrão
app.get('/', (req, res) => {
  res.send('Bem-vindo à API Node.js!');
});

// Tratamento de rota não encontrada (404)
app.use((req, res, next) => {
  next(createError(404, 'Rota não encontrada'));
});

// Middleware de tratamento de erros
app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.json({
    message: err.message,
    error: process.env.NODE_ENV === 'development' ? err.stack : {}  // Exibe o stack trace apenas em desenvolvimento
  });
});

// Definindo a porta e iniciando o servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});

module.exports = app;
