//* Importaciones de terceros
const { Router } = require("express");

//*  Importaciones Internas
const { search } = require("../controllers/search.controller");

//* Variables
const router = Router();

//* Obtener Búsquedas
//* collection =
//* term =
router.get("/:collection/:term", [], search);

//* Exportar ruta
module.exports = router;
