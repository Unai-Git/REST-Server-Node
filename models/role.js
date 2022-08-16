//* Importaciones de terceros
const { Schema, model } = require("mongoose");

//* Modelo de Rol
const RoleSchema = Schema({
  rol: {
    type: String,
    required: [true, "El rol es obligatorio."],
  },
});

//* Exportar Modelo
module.exports = model("Role", RoleSchema);
