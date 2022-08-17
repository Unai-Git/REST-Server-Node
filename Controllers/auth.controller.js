//* Importaciones de terceros
const bcryptjs = require("bcryptjs");

//*  Importaciones Internas
const User = require("../models/user");
const { generateJWT } = require("../helpers/generate-jwt");

const login = async (req, res) => {
  //Recuperar correo y contraseña
  const { email, pass } = req.body;

  try {
    //Verificar si el correo existe
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({
        msg: "Correo no encontrado.",
      });
    }

    //Verificar si el usuario está activo
    if (!user.status) {
      return res.status(400).json({
        msg: "El usuario con ese correo no esta activado.",
      });
    }

    //Verificar la contraseña
    const validPass = bcryptjs.compareSync(pass, user.pass);

    if (!validPass) {
      return res.status(400).json({
        msg: "Contraseña incorrecta.",
      });
    }

    //Generar el JWT
    const token = await generateJWT(user.id);

    res.json({
      user,
      token,
    });
  } catch (error) {
    //Manejar posibles errores
    console.log(error);
    return res.status(500).json({
      msg: "Error en el servidor.",
    });
  }
};

//* Exportar Funciones
module.exports = { login };
