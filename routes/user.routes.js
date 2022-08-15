//* Importaciones de terceros
const { Router } = require("express");

//* Importaciones Internas
const {
  getUsers,
  getUsersById,
  postUsers,
  putUser,
  deleteUsers,
} = require("../controllers/users.controller");

//* Variables
const router = Router();

//* Manejo Rutas de Usuarios

// Obtener TODOS los Usuarios
router.get("/", getUsers);

// Obtener UN SOLO Usuario por su ID
router.get("/:id", getUsersById);

// INSERTAR Usuarios
router.post("/", postUsers);

// ACTUALIZAR Usuario por su ID
router.put("/:id", putUser);

// ELIMINAR Usuario por su ID
router.delete("/:id", deleteUsers);

//* Exportar Router
module.exports = router;
