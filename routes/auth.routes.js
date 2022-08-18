//* Importaciones de terceros
const { Router } = require("express");
const { body } = require("express-validator");

//* Importaciones Internas
const { login, googleSignIn } = require("../controllers/auth.controller");
const { fieldsValidation } = require("../middlewares/fields-validation");

//* Variables
const router = Router();

//* Login
router.post(
  "/login",
  [
    body("email", "El correo es obligatorio").isEmail(),
    body("pass", "La contraseña es obligatoria").not().isEmpty(),
    fieldsValidation,
  ],
  login
);

//* Google
router.post(
  "/google",
  [
    body("id_token", "El token de google es obligatorio").not().isEmpty(),
    fieldsValidation,
  ],
  googleSignIn
);

//* Exportar ruta
module.exports = router;
