const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { v4: uuidv4 } = require('uuid');
const db = require('../services/database');
const { validateRegister, validateLogin } = require('../utils/validation');

const authController = {
  register: async (req, res) => {
    try {
      const { username, password } = req.body;
      
      // Validar dados
      const validation = validateRegister(username, password);
      if (!validation.isValid) {
        return res.status(400).json({ 
          error: validation.message 
        });
      }

      // Verificar se usuário já existe
      const existingUser = db.findUserByUsername(username);
      if (existingUser) {
        return res.status(400).json({ 
          error: 'Usuário já existe' 
        });
      }

      // Hash da senha
      const hashedPassword = await bcrypt.hash(password, 10);

      // Criar usuário
      const user = {
        id: uuidv4(),
        username,
        password: hashedPassword,
        createdAt: new Date().toISOString()
      };

      db.createUser(user);

      // Remover senha da resposta
      const { password: _, ...userResponse } = user;

      res.status(201).json({
        message: 'Usuário criado com sucesso!',
        user: userResponse
      });
    } catch (error) {
      console.error('Erro no registro:', error);
      res.status(500).json({ 
        error: 'Erro interno do servidor' 
      });
    }
  },

  login: async (req, res) => {
    try {
      const { username, password } = req.body;
      
      // Validar dados
      const validation = validateLogin(username, password);
      if (!validation.isValid) {
        return res.status(400).json({ 
          error: validation.message 
        });
      }

      // Buscar usuário
      const user = db.findUserByUsername(username);
      if (!user) {
        return res.status(401).json({ 
          error: 'Credenciais inválidas' 
        });
      }

      // Verificar senha
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        return res.status(401).json({ 
          error: 'Credenciais inválidas' 
        });
      }

      // Gerar JWT
      const token = jwt.sign(
        { userId: user.id, username: user.username },
        process.env.JWT_SECRET,
        { expiresIn: process.env.JWT_EXPIRES_IN || '24h' }
      );

      res.json({
        message: 'Login realizado com sucesso!',
        token,
        user: {
          id: user.id,
          username: user.username
        }
      });
    } catch (error) {
      console.error('Erro no login:', error);
      res.status(500).json({ 
        error: 'Erro interno do servidor' 
      });
    }
  }
};

module.exports = authController;