//* Importaciones de terceros
const { validationResult } = require("express-validator");

//* Validar Campos
const fieldsValidation = (req, res, next) => {
  //Recibir Errores Express-Validator
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json(errors);
  }

  // Continuar con el siguiente middleware y si no hay otro pasa al controlador.
  next();
};

//* Exportar Middleware de validaciones
module.exports = {
  fieldsValidation,
};
