const express = require('express');
const cors = require('cors');

const authRoutes = require('./routes/auth');
const pivotRoutes = require('./routes/pivots');
const irrigationRoutes = require('./routes/irrigations');

const app = express();

app.use(cors());
app.use(express.json());

app.use('/auth', authRoutes);
app.use('/pivots', pivotRoutes);
app.use('/irrigations', irrigationRoutes);

app.get('/', (req, res) => {
  res.json({ 
    message: 'API de Gerenciamento de Irrigação',
    status: 'online',
    timestamp: new Date().toISOString()
  });
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ 
    error: 'Algo deu errado!',
    message: process.env.NODE_ENV === 'development' ? err.message : 'Erro interno do servidor'
  });
});

app.use('*', (req, res) => {
  res.status(404).json({ 
    error: 'Endpoint não encontrado',
    path: req.originalUrl
  });
});

module.exports = app;