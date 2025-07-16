const { v4: uuidv4 } = require('uuid');
const db = require('../services/database');
const { validateIrrigation } = require('../utils/validation');

const irrigationController = {
  // GET /irrigations
  getAll: (req, res) => {
    try {
      const irrigations = db.findIrrigationsByUserId(req.user.id);
      res.json({ irrigations });
    } catch (error) {
      console.error('Erro ao buscar irrigações:', error);
      res.status(500).json({ 
        error: 'Erro interno do servidor' 
      });
    }
  },

  // GET /irrigations/:id
  getById: (req, res) => {
    try {
      const { id } = req.params;
      const irrigation = db.findIrrigationById(id);
      
      if (!irrigation) {
        return res.status(404).json({ 
          error: 'Registro de irrigação não encontrado' 
        });
      }

      // Verificar se a irrigação pertence ao usuário
      if (irrigation.userId !== req.user.id) {
        return res.status(403).json({ 
          error: 'Acesso negado' 
        });
      }

      res.json({ irrigation });
    } catch (error) {
      console.error('Erro ao buscar irrigação:', error);
      res.status(500).json({ 
        error: 'Erro interno do servidor' 
      });
    }
  },

  // POST /irrigations
  create: (req, res) => {
    try {
      const { pivotId, applicationAmount, irrigationDate } = req.body;
      
      // Validar dados
      const validation = validateIrrigation(pivotId, applicationAmount, irrigationDate);
      if (!validation.isValid) {
        return res.status(400).json({ 
          error: validation.message 
        });
      }

      // Verificar se o pivô existe e pertence ao usuário
      const pivot = db.findPivotById(pivotId);
      if (!pivot) {
        return res.status(404).json({ 
          error: 'Pivô não encontrado' 
        });
      }

      if (pivot.userId !== req.user.id) {
        return res.status(403).json({ 
          error: 'Pivô não pertence ao usuário' 
        });
      }

      // Criar registro de irrigação
      const irrigation = {
        id: uuidv4(),
        pivotId,
        applicationAmount: parseFloat(applicationAmount),
        irrigationDate: new Date(irrigationDate).toISOString(),
        userId: req.user.id,
        createdAt: new Date().toISOString()
      };

      db.createIrrigation(irrigation);

      res.status(201).json({
        message: 'Registro de irrigação criado com sucesso!',
        irrigation
      });
    } catch (error) {
      console.error('Erro ao criar irrigação:', error);
      res.status(500).json({ 
        error: 'Erro interno do servidor' 
      });
    }
  },

  // DELETE /irrigations/:id
  delete: (req, res) => {
    try {
      const { id } = req.params;
      
      // Buscar irrigação
      const irrigation = db.findIrrigationById(id);
      if (!irrigation) {
        return res.status(404).json({ 
          error: 'Registro de irrigação não encontrado' 
        });
      }

      // Verificar se a irrigação pertence ao usuário
      if (irrigation.userId !== req.user.id) {
        return res.status(403).json({ 
          error: 'Acesso negado' 
        });
      }

      // Deletar irrigação
      db.deleteIrrigation(id);

      res.json({
        message: 'Registro de irrigação removido com sucesso!'
      });
    } catch (error) {
      console.error('Erro ao deletar irrigação:', error);
      res.status(500).json({ 
        error: 'Erro interno do servidor' 
      });
    }
  }
};

module.exports = irrigationController;