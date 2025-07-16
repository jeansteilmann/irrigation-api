const { v4: uuidv4 } = require('uuid');
const db = require('../services/database');
const { validatePivot } = require('../utils/validation');

const pivotController = {
  // GET /pivots
  getAll: (req, res) => {
    try {
      const pivots = db.findPivotsByUserId(req.user.id);
      res.json({ pivots });
    } catch (error) {
      console.error('Erro ao buscar pivôs:', error);
      res.status(500).json({ 
        error: 'Erro interno do servidor' 
      });
    }
  },

  // GET /pivots/:id
  getById: (req, res) => {
    try {
      const { id } = req.params;
      const pivot = db.findPivotById(id);
      
      if (!pivot) {
        return res.status(404).json({ 
          error: 'Pivô não encontrado' 
        });
      }

      // Verificar se o pivô pertence ao usuário
      if (pivot.userId !== req.user.id) {
        return res.status(403).json({ 
          error: 'Acesso negado' 
        });
      }

      res.json({ pivot });
    } catch (error) {
      console.error('Erro ao buscar pivô:', error);
      res.status(500).json({ 
        error: 'Erro interno do servidor' 
      });
    }
  },

  // POST /pivots
  create: (req, res) => {
    try {
      const { description, flowRate, minApplicationDepth } = req.body;
      
      // Validar dados
      const validation = validatePivot(description, flowRate, minApplicationDepth);
      if (!validation.isValid) {
        return res.status(400).json({ 
          error: validation.message 
        });
      }

      // Criar pivô
      const pivot = {
        id: uuidv4(),
        description,
        flowRate: parseFloat(flowRate),
        minApplicationDepth: parseFloat(minApplicationDepth),
        userId: req.user.id,
        createdAt: new Date().toISOString()
      };

      db.createPivot(pivot);

      res.status(201).json({
        message: 'Pivot created successfully!',
        pivot
      });
    } catch (error) {
      console.error('Erro ao criar pivô:', error);
      res.status(500).json({ 
        error: 'Erro interno do servidor' 
      });
    }
  },

  // PUT /pivots/:id
  update: (req, res) => {
    try {
      const { id } = req.params;
      const { description, flowRate, minApplicationDepth } = req.body;
      
      // Buscar pivô
      const pivot = db.findPivotById(id);
      if (!pivot) {
        return res.status(404).json({ 
          error: 'Pivô não encontrado' 
        });
      }

      // Verificar se o pivô pertence ao usuário
      if (pivot.userId !== req.user.id) {
        return res.status(403).json({ 
          error: 'Acesso negado' 
        });
      }

      // Validar dados
      const validation = validatePivot(description, flowRate, minApplicationDepth);
      if (!validation.isValid) {
        return res.status(400).json({ 
          error: validation.message 
        });
      }

      // Atualizar pivô
      const updatedPivot = db.updatePivot(id, {
        description,
        flowRate: parseFloat(flowRate),
        minApplicationDepth: parseFloat(minApplicationDepth),
        updatedAt: new Date().toISOString()
      });

      res.json({
        message: 'Pivô atualizado com sucesso!',
        pivot: updatedPivot
      });
    } catch (error) {
      console.error('Erro ao atualizar pivô:', error);
      res.status(500).json({ 
        error: 'Erro interno do servidor' 
      });
    }
  },

  // DELETE /pivots/:id
  delete: (req, res) => {
    try {
      const { id } = req.params;
      
      // Buscar pivô
      const pivot = db.findPivotById(id);
      if (!pivot) {
        return res.status(404).json({ 
          error: 'Pivô não encontrado' 
        });
      }

      // Verificar se o pivô pertence ao usuário
      if (pivot.userId !== req.user.id) {
        return res.status(403).json({ 
          error: 'Acesso negado' 
        });
      }

      // Deletar pivô
      db.deletePivot(id);

      res.json({
        message: 'Pivô removido com sucesso!'
      });
    } catch (error) {
      console.error('Erro ao deletar pivô:', error);
      res.status(500).json({ 
        error: 'Erro interno do servidor' 
      });
    }
  }
};

module.exports = pivotController;