//* Importaciones de terceros
const jwt = require("jsonwebtoken");

//* Generar promise del jsonWebtoken
const generateJWT = (uid = "") => {
  //Promesa
  return new Promise((resolve, reject) => {
    //! No almacenar información sensible, los token no son muy seguros.
    const payload = { uid };

    //Firmar nuevo token(payload y secretKey)
    jwt.sign(
      payload,
      process.env.PRIVATE_TOKEN_KEY,
      {
        expiresIn: "4h",
      },
      (err, token) => {
        //Manejar posibles errores y devolver el token
        if (err) {
          console.log(err);
          reject("No se pudo generar el token.");
        } else {
          resolve(token);
        }
      }
    );
  });
};

//* Exportar JWT
module.exports = { generateJWT };
