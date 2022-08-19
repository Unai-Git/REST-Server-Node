//* Importaciones Internas
const Category = require("../models/category");
const Product = require("../models/product");
const Rol = require("../models/role");
const User = require("../models/user");

//* Validar contra la BBDD

//Validar Rol
const isValidRol = async (rol = "") => {
  const rolExists = await Rol.findOne({ rol });
  if (!rolExists) {
    throw new Error(`El rol ${rol} no esta registrado.`);
  }
};

//Validar Email
const isValidEmail = async (email = "") => {
  //Verificar si el correo existe
  const emailExists = await User.findOne({ email });

  if (emailExists) {
    throw new Error(`El Correo ${email} ya esta registrado.`);
  }
};

//Validar Id
const isValidId = async (id) => {
  //Comprobar que el id es el mismo que en la BBDD
  const idExists = await User.findById(id);
  if (!idExists) {
    throw new Error(`El id ${id} no existe.`);
  }
};

// Validar existe categoría
const existsCategory = async (id) => {
  //Comprobar que el id es el mismo que en la BBDD
  const idExists = await Category.findById(id);
  if (!idExists) {
    throw new Error(`El id ${id} no existe.`);
  }
};

// Validar existe producto
const existsProduct = async (id) => {
  //Comprobar que el id es el mismo que en la BBDD
  const idExists = await Product.findById(id);
  if (!idExists) {
    throw new Error(`El id ${id} no existe.`);
  }
};

//* Exportar validaciones
module.exports = {
  isValidRol,
  isValidEmail,
  isValidId,
  existsCategory,
  existsProduct,
};
