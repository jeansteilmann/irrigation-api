const jwt = require('jsonwebtoken');
const db = require('../services/database');

const authMiddleware = (req, res, next) => {
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    
    if (!token) {
      return res.status(401).json({ 
        error: 'Token de acesso requerido' 
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = db.findUserById(decoded.userId);
    
    if (!user) {
      return res.status(401).json({ 
        error: 'Token inválido' 
      });
    }

    req.user = user;
    next();
  } catch (error) {
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({ 
        error: 'Token expirado' 
      });
    }
    
    return res.status(401).json({ 
      error: 'Token inválido' 
    });
  }
};

module.exports = authMiddleware;