//* Importaciones de terceros
const { Schema, model } = require("mongoose");

//* Modelo de Categoría
const CategorySchema = Schema({
  name: {
    type: String,
    required: [true, "El nombre es obligatorio."],
    unique: true,
  },
  status: {
    type: Boolean,
    required: [true, "El estado es obligatorio."],
    default: true,
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: [true, "El Usuario es obligatorio."],
  },
});

//* Sobrescribir método toJSON
CategorySchema.methods.toJSON = function () {
  //Separar la version y la contraseña del resto del Usuario
  const { __v, status, ...data } = this.toObject();

  return data;
};

//* Exportar Modelo
module.exports = model("Category", CategorySchema);
