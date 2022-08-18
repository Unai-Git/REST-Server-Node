//* Importaciones de terceros
const { OAuth2Client } = require("google-auth-library");

//* Variables
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

//* Verificar el Google ID Token en el lado del servidor
async function googleVerify(token = "") {
  const ticket = await client.verifyIdToken({
    idToken: token,
    audience: process.env.GOOGLE_CLIENT_ID,
  });

  // Datos del usuario
  const { name, picture, email } = ticket.getPayload();

  return {
    name,
    img: picture,
    email,
  };
}

//* Exportar Google Verify
module.exports = { googleVerify };
