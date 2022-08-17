//* Importaciones de terceros
const jwt = require("jsonwebtoken");

//* Importaciones Internas

//* Comprobar si es administrador
const isAdminRol = (req, res, next) => {
  //req.user devuelve el usuario autenticado con el JWT

  if (!req.user) {
    return res.status(500).json({
      msg: "Es necesario validar el token primero.",
    });
  }

  // Comprobar si es administrador
  const { rol, name } = req.user;
  if (rol !== "Admin") {
    return res.status(400).json({
      msg: `Operación invalida: ${name} no tiene rol de  administrador`,
    });
  }

  // Continuar con los middlewares o controladores
  next();
};

// Comprobar el rol que tiene
const haveRol = (...roles) => {
  //Mandar la función al user.router
  return (req, res, next) => {
    // Verificar que tiene token
    if (!req.user) {
      return res.status(500).json({
        msg: "Es necesario validar el token primero.",
      });
    }

    // Comprobar que rol tiene
    if (!roles.includes(req.user.rol)) {
      return res.status(400).json({
        msg: `Operación invalida: Necesitas pertenecer a un rol de estos [ ${roles} ]`,
      });
    }
    next();
  };
};

//* Exportar validación del rol
module.exports = { isAdminRol, haveRol };
