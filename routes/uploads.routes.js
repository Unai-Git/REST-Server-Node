//* Importaciones de terceros
const { Router } = require("express");
const { param } = require("express-validator");

//* Importaciones Internas
const {
  chargeFiles,
  updateImage,
  showImage,
} = require("../controllers/uploads.controller");
const { allowedCollections } = require("../database/db-validators");
const { fieldsValidation } = require("../middlewares/fields-validation");
const { uploadValidation } = require("../middlewares/uploads-validation");

//* Variables
const router = Router();

//* Subir ficheros
router.post("/", uploadValidation, chargeFiles);

//* Mostrar imagen
router.get(
  "/:collection/:id",
  [
    //uploadValidation,
    param("id", "No es un id de mongo").isMongoId(),
    param("collection").custom((c) =>
      allowedCollections(c, ["users", "products"])
    ),
    fieldsValidation,
  ],
  showImage
);

//* Actualizar imagen
router.put(
  "/:collection/:id",
  [
    uploadValidation,
    param("id", "No es un id de mongo").isMongoId(),
    param("collection").custom((c) =>
      allowedCollections(c, ["users", "products"])
    ),
    fieldsValidation,
  ],
  updateImage
);

//* Exportar ruta
module.exports = router;
