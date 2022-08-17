//* Importaciones de terceros
const jwt = require("jsonwebtoken");

//* Importaciones Internas
const User = require("../models/user");

//* Proteger rutas
const validateJWT = async (req, res, next) => {
  const token = req.header("x-token");

  // Comprobar si se manda el Token
  if (!token) {
    return res.status(401).json({
      msg: "No se ha enviado token.",
    });
  }

  try {
    // Verificar si el token enviado es valido
    const { uid } = jwt.verify(token, process.env.PRIVATE_TOKEN_KEY);

    // Leer usuario que corresponde con al uid
    const user = await User.findById(uid);

    // Si no encuentra ningún usuario con el uid
    if (!user) {
      return res.status(401).json({
        msg: "El usuario no existe.",
      });
    }

    // Verificar si el usuario esta activado
    if (!user.status) {
      return res.status(401).json({
        msg: "El usuario no esta activado(Eliminado).",
      });
    }
    //Mandar usuario autenticado
    req.user = user;
    // Continuar con los middlewares o controladores
    next();
  } catch (error) {
    console.log(error);
    res.status(401).json({
      msg: "El token enviado no es valido",
    });
  }
};

//* Exportar validación de JWT
module.exports = validateJWT;
