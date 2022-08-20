//* Importaciones de terceros
const { Schema, model } = require("mongoose");

//* Modelo de Producto
const ProductSchema = Schema({
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

  price: {
    type: Number,
    default: 0,
  },
  category: {
    type: Schema.Types.ObjectId,
    ref: "Category",
    required: [true, "La Categoría es obligatorio."],
  },
  description: {
    type: String,
  },
  available: {
    type: Boolean,
    default: true,
  },
  img: {
    type: String,
  },
});

//* Sobrescribir método toJSON
ProductSchema.methods.toJSON = function () {
  //Separar la version y la contraseña del resto del Usuario
  const { __v, status, ...data } = this.toObject();

  return data;
};

//* Exportar Modelo
module.exports = model("Product", ProductSchema);
