//Banco em memória
const database = {
    users: [],
    pivots: [],
    irrigations: []
  };
  
  // Métodos auxiliares para manipulação dos dados
  const db = {
    // Users
    createUser: (user) => {
      database.users.push(user);
      return user;
    },
    
    findUserByUsername: (username) => {
      return database.users.find(user => user.username === username);
    },
    
    findUserById: (id) => {
      return database.users.find(user => user.id === id);
    },
  
    // Pivots
    createPivot: (pivot) => {
      database.pivots.push(pivot);
      return pivot;
    },
    
    findPivotsByUserId: (userId) => {
      return database.pivots.filter(pivot => pivot.userId === userId);
    },
    
    findPivotById: (id) => {
      return database.pivots.find(pivot => pivot.id === id);
    },
    
    updatePivot: (id, updatedData) => {
      const index = database.pivots.findIndex(pivot => pivot.id === id);
      if (index !== -1) {
        database.pivots[index] = { ...database.pivots[index], ...updatedData };
        return database.pivots[index];
      }
      return null;
    },
    
    deletePivot: (id) => {
      const index = database.pivots.findIndex(pivot => pivot.id === id);
      if (index !== -1) {
        return database.pivots.splice(index, 1)[0];
      }
      return null;
    },
  
    // Irrigations
    createIrrigation: (irrigation) => {
      database.irrigations.push(irrigation);
      return irrigation;
    },
    
    findIrrigationsByUserId: (userId) => {
      return database.irrigations.filter(irrigation => irrigation.userId === userId);
    },
    
    findIrrigationById: (id) => {
      return database.irrigations.find(irrigation => irrigation.id === id);
    },
    
    deleteIrrigation: (id) => {
      const index = database.irrigations.findIndex(irrigation => irrigation.id === id);
      if (index !== -1) {
        return database.irrigations.splice(index, 1)[0];
      }
      return null;
    },
  
    // Utility
    reset: () => {
      database.users = [];
      database.pivots = [];
      database.irrigations = [];
    }
  };
  
  module.exports = db;