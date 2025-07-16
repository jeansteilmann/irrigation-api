const express = require('express');
const irrigationController = require('../controllers/irrigationController');
const authMiddleware = require('../middleware/auth');

const router = express.Router();

// Aplicar middleware de autenticação a todas as rotas
router.use(authMiddleware);

// GET /irrigations
router.get('/', irrigationController.getAll);

// GET /irrigations/:id
router.get('/:id', irrigationController.getById);

// POST /irrigations
router.post('/', irrigationController.create);

// DELETE /irrigations/:id
router.delete('/:id', irrigationController.delete);

module.exports = router;