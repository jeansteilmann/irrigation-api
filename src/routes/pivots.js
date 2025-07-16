const express = require('express');
const pivotController = require('../controllers/pivotController');
const authMiddleware = require('../middleware/auth');

const router = express.Router();

// Aplicar middleware de autenticação a todas as rotas
router.use(authMiddleware);

// GET /pivots
router.get('/', pivotController.getAll);

// GET /pivots/:id
router.get('/:id', pivotController.getById);

// POST /pivots
router.post('/', pivotController.create);

// PUT /pivots/:id
router.put('/:id', pivotController.update);

// DELETE /pivots/:id
router.delete('/:id', pivotController.delete);

module.exports = router;