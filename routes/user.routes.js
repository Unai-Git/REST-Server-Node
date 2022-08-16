//* Importaciones de terceros
const { Router } = require("express");
const { check } = require("express-validator");

//* Importaciones Internas
const {
  getUsers,
  getUsersPaginated,
  getUsersById,
  postUsers,
  putUser,
  deleteUsers,
} = require("../controllers/users.controller");
const {
  isValidRol,
  isValidEmail,
  isValidId,
} = require("../database/db-validators");
const { fieldsValidation } = require("../middlewares/fields-validation");

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
    check("name", "El nombre no es valido.").not().isEmpty(),
    check("pass", "La contraseña debe tener más de 5 caracteres.").isLength({
      min: 6,
    }),
    check("email", "El formato del correo no es valido.").isEmail(),
    check("email").custom(isValidEmail),
    check("rol").custom(isValidRol), //? Es es igual que check("rol").custom((rol)=>{isValidRol(rol)})
    fieldsValidation,
  ],
  postUsers
);

//* ACTUALIZAR Usuario por su ID
router.put(
  "/:id",
  [
    check("id", "El id no es valido.")
      .isMongoId()
      .bail()
      .custom(isValidId)
      .bail(),
    check("rol").optional().custom(isValidRol),
    fieldsValidation,
  ],
  putUser
);

//* ELIMINAR Usuario por su ID
router.delete(
  "/:id",
  [
    check("id", "El id no es valido.")
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
