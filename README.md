# API de Gerenciamento de Irrigação

API RESTful para gerenciar pivôs e irrigações, desenvolvida com Node.js e Express.

## 🚀 Funcionalidades

- **Autenticação JWT**: Registro e login de usuários
- **Gerenciamento de Pivôs**: CRUD completo (Criar, Ler, Atualizar, Apagar)
- **Registros de Irrigação**: Criar e consultar histórico de irrigações
- **Segurança**: Rotas protegidas por autenticação JWT

## ⚙️ Como usar

### Pré-requisitos

- Node.js (v14+)
- npm ou yarn

### Instalação

1. Clone o repositório:
   ```bash
   git clone <url-do-repositorio>
   ```

2. Entre na pasta do projeto:
   ```bash
   cd irrigation-api
   ```

3. Instale as dependências:
   ```bash
   npm install
   ```

4. Configure as variáveis de ambiente:
   ```bash
   cp .env.example .env
   ```
   Edite o arquivo `.env` e configure o `JWT_SECRET`.

### Iniciar a API

```bash
npm run dev
```

A API estará disponível em `http://localhost:3000`.

## 📚 Endpoints

> **Nota:** As rotas de Pivôs e Irrigações exigem autenticação. Inclua o header `Authorization: Bearer <seu_token>` nas requisições.

### Autenticação

- `POST /auth/register` - Registrar novo usuário
- `POST /auth/login` - Login do usuário (retorna token)

### Pivôs

- `GET /pivots` - Listar todos os pivôs do usuário autenticado
- `GET /pivots/:id` - Obter pivô específico
- `POST /pivots` - Criar novo pivô
- `PUT /pivots/:id` - Atualizar pivô existente
- `DELETE /pivots/:id` - Remover pivô

### Irrigações

- `GET /irrigations` - Listar todos os registros de irrigação do usuário
- `GET /irrigations/:id` - Obter registro específico de irrigação
- `POST /irrigations` - Criar novo registro de irrigação
- `DELETE /irrigations/:id` - Remover registro de irrigação

## 🔒 Autenticação

Para acessar as rotas protegidas, inclua o token JWT no cabeçalho das requisições:

```
Authorization: Bearer <seu_token_jwt>
```

## 🛠️ Tecnologias

- Node.js
- Express.js
- JWT (JSON Web Tokens)
- JavaScript

## 📝 Licença

Este projeto está sob a licença MIT.