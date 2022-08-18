//* Importaciones de terceros
const bcryptjs = require("bcryptjs");

//*  Importaciones Internas
const User = require("../models/user");
const { generateJWT } = require("../helpers/generate-jwt");
const { googleVerify } = require("../helpers/google-verify");

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

//* Google
const googleSignIn = async (req, res) => {
  // Recuperar id token
  const { id_token } = req.body;

  try {
    const { name, img, email } = await googleVerify(id_token);

    let user = await User.findOne({ email });

    // Crear usuario en el caso de que no exista
    if (!user) {
      // Datos del usuario de google
      const data = {
        name,
        email,
        rol: "User",
        pass: " ",
        img,
        google: true,
      };
      // Crear un nuevo usuario
      user = new User(data);

      // Guardar/Insertar el usuario
      await user.save();
    }

    // Comprobar si el usuario tiene un status false
    if (!user.status) {
      return res.status(401).json({
        msg: "Usuario bloqueado.",
      });
    }
    console.log(user.id);
    //Generar el JWT
    const token = await generateJWT(user.id);

    // Enviar respuesta
    res.json({
      user,
      token,
    });
  } catch (error) {
    res.status(400).json({
      msg: "Error al registrar un usuario google.",
      error,
    });
  }
};

//* Exportar Funciones
module.exports = { login, googleSignIn };
