//* Importaciones de terceros
const { Router } = require("express");
const { check } = require("express-validator");

//* Importaciones Internas
const { login } = require("../controllers/auth.controller");
const { fieldsValidation } = require("../middlewares/fields-validation");

//* Variables
const router = Router();

router.post(
  "/login",
  [
    check("email", "El correo es obligatorio").isEmail(),
    check("pass", "La contraseña es obligatoria").not().isEmpty(),
    fieldsValidation,
  ],
  login
);

//* Exportar ruta
module.exports = router;
