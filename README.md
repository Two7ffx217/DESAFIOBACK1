# Backend1 - Node.js API

Este é um projeto de backend utilizando **Node.js**, **Express** e **MySQL**. Ele oferece uma API com endpoints para gerenciar **clientes** e **produtos** com operações CRUD (Criar, Ler, Atualizar, Deletar).

## Tecnologias Utilizadas

- **Node.js**: JavaScript no backend.
- **Express**: Framework para criar a API.
- **MySQL**: Banco de dados para armazenar informações de clientes e produtos.
- **dotenv**: Carregar variáveis de ambiente de forma segura.
- **cookie-parser**: Middleware para lidar com cookies.
- **morgan**: Middleware de logging para monitoramento de requisições HTTP.
- **http-errors**: Para tratamento de erros HTTP.
- **jade**: Template engine para renderizar páginas HTML.
- **mysql2**: Conector MySQL para Node.js.

## Instalação

Para rodar este projeto, siga os passos abaixo:

### 1. Clone o repositório

```bash
git clone https://github.com/SEU_USUARIO/backend1.git
cd backend1


### 2. Instale as dependências
npm install

### 3. Crie um arquivo .env
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=sua_senha
DB_NAME=nome_do_banco
PORT=3000

### 4. Rodando o projeto
### Para rodar o servidor em modo de desenvolvimento, utilize:

npm run dev

### Para rodar o servidor em produção, utilize:

npm start
 

 ### 5. Acessando a API

GET /clientes - Lista todos os clientes.

POST /clientes - Cria um novo cliente.

PUT /clientes/:id - Atualiza um cliente existente.

DELETE /clientes/:id - Deleta um cliente.

GET /produtos - Lista todos os produtos.

POST /produtos - Cria um novo produto.

PUT /produtos/:id - Atualiza um produto existente.

DELETE /produtos/:id - Deleta um produto.



### Estrutura do Projeto

/backend1
  /configs        # Arquivos de configuração
  /controllers    # Lógica de negócios
  /middlewares    # Validações e middleware de erros
  /models         # Definições de banco de dados (tabelas)
  /routes         # Definições de endpoints
  /services       # Funções que interagem com o banco de dados
  /views          # Templates para renderização de páginas
  .env            # Variáveis de ambiente
  .eslintrc.json  # Configuração do ESLint
  .gitignore      # Arquivos a serem ignorados pelo git
  app.js          # Arquivo principal da aplicação
  package.json    # Dependências e scripts do projeto
  README.md       # Documentação do projeto


### Licença

### Explicação:

- **Instalação**: Passos para clonar o repositório e configurar o ambiente local.
- **Rodando o Projeto**: Como iniciar o servidor em desenvolvimento ou produção.
- **API**: Descrição dos endpoints disponíveis, como **clientes** e **produtos**, e suas respectivas operações CRUD.
- **Estrutura do Projeto**: Explicação sobre a organização das pastas e arquivos no projeto.
- **Contribuindo**: Instruções para quem quiser contribuir com o projeto.
- **Licença**: Informação sobre a licença do projeto (caso você tenha uma licença em mente).

Esse modelo pode ser ajustado conforme o avanço do seu projeto e qualquer outro detalhe que você queira adicionar.










