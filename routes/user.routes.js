//* Importaciones de terceros
const { Router } = require("express");
const { body, param } = require("express-validator");

//* Importaciones Internas
// Controladores
const {
  getUsers,
  getUsersPaginated,
  getUsersById,
  postUsers,
  putUser,
  deleteUsers,
} = require("../controllers/users.controller");

// Validaciones y Middlewares
const {
  isValidRol,
  isValidEmail,
  isValidId,
} = require("../database/db-validators");
const { fieldsValidation } = require("../middlewares/fields-validation");
const validateJWT = require("../middlewares/jwt-validation");
const {isAdminRol, haveRol} = require("../middlewares/rol-validation");


//* Variables
const router = Router();

//* [ Manejo Rutas de Usuarios ]

//* Obtener TODOS los Usuarios
router.get("/", getUsers);

//* Obtener TODOS los Usuarios paginados
router.get("/paginated", getUsersPaginated);

//* Obtener UN SOLO Usuario por su ID
router.get("/:id", getUsersById);

//* INSERTAR Usuarios
router.post(
  "/",
  [
    body("name", "El nombre no es valido.").not().isEmpty(),
    body("pass", "La contraseña debe tener más de 5 caracteres.").isLength({
      min: 6,
    }),
    body("email", "El formato del correo no es valido.").isEmail(),
    body("email").custom(isValidEmail),
    body("rol").custom(isValidRol), //? Es es igual que check("rol").custom((rol)=>{isValidRol(rol)})
    fieldsValidation,
  ],
  postUsers
);

//* ACTUALIZAR Usuario por su ID
router.put(
  "/:id",
  [
    param("id", "El id no es valido.")
      .isMongoId()
      .bail()
      .custom(isValidId)
      .bail(),
    body("rol").optional().custom(isValidRol),
    fieldsValidation,
  ],
  putUser
);

//* ELIMINAR Usuario por su ID
router.delete(
  "/:id",
  [
    validateJWT,
    //isAdminRol,
    haveRol("Admin", "Sales"),
    param("id", "El id no es valido.")
      .isMongoId()
      .bail()
      .custom(isValidId)
      .bail(),
    fieldsValidation,
  ],
  deleteUsers
);

//* Exportar Router
module.exports = router;
