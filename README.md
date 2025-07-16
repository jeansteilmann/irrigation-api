

# API de Gerenciamento de Irrigação

API RESTful para gerenciar pivôs e irrigações.Desenvolvida com Node.js e Express. 

-----

## 🚀 O que faz

  ***Autenticação JWT**: Registro e login de usuários. 
  ***Gerenciamento de Pivôs**: CRUD (Criar, Ler, Atualizar, Apagar). 
  ***Registros de Irrigação**: Criar e consultar. 
  ***Segurança**: Rotas protegidas por JWT. 

-----

## ⚙️ Como usar

### Pré-requisitos

  *Node.js (v14+) [cite: 1]
  *npm ou yarn [cite: 1]

### Instalação

1.  Clone: `git clone <url-do-repositorio>`
2.  Entre na pasta: `cd irrigation-api`
3.  Instale: `npm install`
4.  Configure: `cp .env.example .env` (Edite `JWT_SECRET`).

### Iniciar API

```bash
npm run dev
```

A API estará em `http://localhost:3000`.

-----

## 📚 Endpoints
**Nota:** Rotas de Pivôs e Irrigações exigem `Authorization: Bearer <seu_token>` no cabeçalho. [cite: 10, 13, 26]

### Autenticação

  *`POST /auth/register` - Registrar usuário. [cite: 8]
  *`POST /auth/login` - Login, retorna token. [cite: 9]

### Pivôs

  *`GET /pivots` - Listar todos os pivôs do usuário autenticado. [cite: 15]
  *`GET /pivots/:id` - Obter pivô específico. [cite: 17]
  *`POST /pivots` - Criar pivô. [cite: 19]
  *`PUT /pivots/:id` - Atualizar pivô. [cite: 21]
  *`DELETE /pivots/:id` - Remover pivô. [cite: 23]

### Irrigações

  *`GET /irrigations` - Listar todos os registros de irrigação do usuário autenticado. [cite: 28]
  *`GET /irrigations/:id` - Obter registro específico. [cite: 30]
  *`POST /irrigations` - Criar registro. [cite: 36]
  *`DELETE /irrigations/:id` - Remover registro. [cite: 37]

-----