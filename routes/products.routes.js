//* Importaciones de terceros
const { Router } = require("express");
const { body, param } = require("express-validator");

//* Importaciones Internas
const { fieldsValidation } = require("../middlewares/fields-validation");
const validateJWT = require("../middlewares/jwt-validation");
const {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
} = require("../controllers/products.controller");
const { existsProduct, existsCategory } = require("../database/db-validators");
const { isAdminRol } = require("../middlewares/rol-validation");

//* Variables
const router = Router();

//* Obtener Todos los Productos

router.get("/", [], getProducts);

//* Obtener un Producto por su Id
router.get(
  "/:id",
  [
    param("id", "El id no es valido.")
      .isMongoId()
      .bail()
      .custom(existsProduct)
      .bail(),
    fieldsValidation,
  ],
  getProductById
);

//* Crear un nuevo Producto
router.post(
  "/",
  [
    validateJWT,
    body("name", "El nombre es obligatorio").not().isEmpty(),
    body("category", "No es un id de mongo.")
      .isMongoId()
      .bail()
      .custom(existsCategory)
      .bail(),
    fieldsValidation,
  ],
  createProduct
);

//* Actualizar un producto por su Id
router.put(
  "/:id",
  [validateJWT, param("id").custom(existsProduct), fieldsValidation],
  updateProduct
);

//* Eliminar un producto por su Id
router.delete(
  "/:id",
  [
    validateJWT,
    isAdminRol,
    param("id", "El id no es valido.")
      .isMongoId()
      .bail()
      .custom(existsProduct)
      .bail(),
    fieldsValidation,
  ],
  deleteProduct
);

//* Exportar ruta
module.exports = router;
