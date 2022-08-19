//* Importaciones de terceros
const { Router } = require("express");
const { body, param } = require("express-validator");

//* Importaciones Internas
const { fieldsValidation } = require("../middlewares/fields-validation");
const validateJWT = require("../middlewares/jwt-validation");
const {
  createCategory,
  getCategories,
  getCategoryById,
  putCategory,
  deleteCategory,
} = require("../controllers/categories.controller");
const { existsCategory } = require("../database/db-validators");
const { isAdminRol } = require("../middlewares/rol-validation");

//* Variables
const router = Router();

//* Obtener TODAS las categorías
router.get("/", getCategories);

//* Obtener una categoría por ID
router.get(
  "/:id",
  [
    param("id", "El id no es valido.")
      .isMongoId()
      .bail()
      .custom(existsCategory)
      .bail(),
    fieldsValidation,
  ],
  getCategoryById
);

//* Crear una nueva categoría
router.post(
  "/",
  [
    validateJWT,
    body("name", "El nombre es obligatorio").not().isEmpty(),
    fieldsValidation,
  ],
  createCategory
);

//* Actualizar una categoría por ID (Token Necesario)
router.put(
  "/:id",
  [
    validateJWT,
    param("id", "El id no es valido.")
      .isMongoId()
      .bail()
      .custom(existsCategory)
      .bail(),
    body("name").not().isEmpty(),
    fieldsValidation,
  ],
  putCategory
);

//* Eliminar una categoría por ID (Solo Admin)
router.delete(
  "/:id",
  [
    validateJWT,
    isAdminRol,
    param("id", "El id no es valido.")
      .isMongoId()
      .bail()
      .custom(existsCategory)
      .bail(),
    fieldsValidation,
  ],
  deleteCategory
);

//* Exportar ruta
module.exports = router;
