//* Importaciones de terceros
const { Schema, model } = require("mongoose");

//* Crear Modelo Usuario
const UserSchema = Schema({
  name: {
    type: String,
    required: [true, "El nombre es obligatorio"],
  },
  email: {
    type: String,
    required: [true, "El Correo es obligatorio"],
    unique: true,
  },
  pass: {
    type: String,
    required: [true, "La contraseña es obligatoria"],
  },
  img: {
    type: String,
  },
  rol: {
    type: String,
    required: [true, "El Rol es obligatorio"],
    default: "User",
  },
  status: {
    type: Boolean,
    default: true,
  },
  google: {
    type: Boolean,
    default: false,
  },
});

//* Sobrescribir método toJSON
UserSchema.methods.toJSON = function () {
  //Separar la version y la contraseña del resto del Usuario
  const { __v, pass, _id, ...user } = this.toObject();
  //Cambiar nombre del _id por uid
  user.uid = _id;
  return user;
};

//* Exportar Modelo User(En singular)
module.exports = model("User", UserSchema);
