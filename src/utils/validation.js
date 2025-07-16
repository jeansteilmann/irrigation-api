const validation = {
    validateRegister: (username, password) => {
      if (!username || !password) {
        return { isValid: false, message: 'Username e password são obrigatórios' };
      }
      
      if (username.length < 3) {
        return { isValid: false, message: 'Username deve ter pelo menos 3 caracteres' };
      }
      
      if (password.length < 6) {
        return { isValid: false, message: 'Password deve ter pelo menos 6 caracteres' };
      }
      
      return { isValid: true };
    },
  
    validateLogin: (username, password) => {
      if (!username || !password) {
        return { isValid: false, message: 'Username e password são obrigatórios' };
      }
      
      return { isValid: true };
    },
  
    validatePivot: (description, flowRate, minApplicationDepth) => {
      if (!description || flowRate === undefined || minApplicationDepth === undefined) {
        return { 
          isValid: false, 
          message: 'Campos obrigatórios: description, flowRate, minApplicationDepth' 
        };
      }
      
      if (typeof description !== 'string' || description.trim().length < 3) {
        return { 
          isValid: false, 
          message: 'Description deve ser uma string com pelo menos 3 caracteres' 
        };
      }
      
      const flowRateNum = parseFloat(flowRate);
      if (isNaN(flowRateNum) || flowRateNum <= 0) {
        return { 
          isValid: false, 
          message: 'FlowRate deve ser um número positivo' 
        };
      }
      
      const minDepthNum = parseFloat(minApplicationDepth);
      if (isNaN(minDepthNum) || minDepthNum <= 0) {
        return { 
          isValid: false, 
          message: 'MinApplicationDepth deve ser um número positivo' 
        };
      }
      
      return { isValid: true };
    },
  
    validateIrrigation: (pivotId, applicationAmount, irrigationDate) => {
      if (!pivotId || applicationAmount === undefined || !irrigationDate) {
        return { 
          isValid: false, 
          message: 'Campos obrigatórios: pivotId, applicationAmount, irrigationDate' 
        };
      }
      
      if (typeof pivotId !== 'string' || pivotId.trim().length === 0) {
        return { 
          isValid: false, 
          message: 'PivotId deve ser uma string válida' 
        };
      }
      
      const appAmount = parseFloat(applicationAmount);
      if (isNaN(appAmount) || appAmount <= 0) {
        return { 
          isValid: false, 
          message: 'ApplicationAmount deve ser um número positivo' 
        };
      }
      
      const date = new Date(irrigationDate);
      if (isNaN(date.getTime())) {
        return { 
          isValid: false, 
          message: 'IrrigationDate deve ser uma data válida' 
        };
      }
      
      return { isValid: true };
    }
  };
  
  module.exports = validation;