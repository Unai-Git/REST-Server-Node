//* Importaciones de terceros
//const { response } = require("express");

// Obtener TODOS los Usuarios
const getUsers = (req, res) => {
  const body = req.body;

  res.json({
    msg: "Prueba get-controller OK",
    body,
  });
};

// Obtener UN SOLO Usuario por su ID
const getUsersById = (req, res) => {
  //const id = req.params.id;
  const { id } = req.params;

  res.json({
    msg: "Prueba get ID-controller OK",
    id,
  });
};

// INSERTAR Usuarios
const postUsers = (req, res) => {
  res.json({
    msg: "Prueba post-controller OK",
  });
};

// ACTUALIZAR Usuario por su ID
const putUser = (req, res) => {
  res.json({
    msg: "Prueba put-controller OK",
  });
};

// ELIMINAR Usuario por su ID
const deleteUsers = (req, res) => {
  res.json({
    msg: "Prueba delete-controller OK",
  });
};

//* Exportar Funciones
module.exports = { getUsers, getUsersById, postUsers, putUser, deleteUsers };
