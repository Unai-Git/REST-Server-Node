//* Importaciones de terceros
const bcryptjs = require("bcryptjs");

//* Importaciones Internas
const User = require("../models/user");

//* Obtener TODOS los Usuarios
const getUsers = async (req, res) => {
  //Guardar los datos del modelo User
  const user = await User.find({ status: true });

  //Numero total de registros
  const total = await User.countDocuments({ status: true });

  res.json({
    total,
    user,
  });
};

//* Obtener TODOS los Usuarios paginados
const getUsersPaginated = async (req, res) => {
  //Recoger parámetro limite
  const { limit = 4, since = 0 } = req.query;

  //!-------------------------------------------
  //* Otra forma distinta al  getUser() de arriba
  //!-------------------------------------------

  //Ejecutar promesas de forma simultanea
  const [total, user] = await Promise.all([
    User.countDocuments({ status: true }),
    User.find({ status: true }).skip(Number(since)).limit(Number(limit)),
  ]);

  res.json({
    total,
    user,
  });
};

//* Obtener UN SOLO Usuario por su ID
const getUsersById = async (req, res) => {
  //const id = req.params.id;
  const { id } = req.params;

  //Recuperar usuario por id
  const user = await User.findById(id);

  //Desestructurar datos

  const { name, email, rol } = user;

  res.json({
    name,
    email,
    rol,
  });
};

//* INSERTAR Usuarios
const postUsers = async (req, res) => {
  //Recibir los datos del body
  const { name, email, pass, rol } = req.body;

  //Instanciar obj Usuario
  const user = new User({ name, email, pass, rol });

  //Encriptar contraseña
  const salt = bcryptjs.genSaltSync(); //Numero de vueltas para encriptar. Default = 10
  user.pass = bcryptjs.hashSync(pass, salt);

  //Grabar datos en la BBDD
  await user.save();

  res.json({
    msg: "Prueba post-controller OK",
    user,
  });
};

//* ACTUALIZAR Usuario por su ID
const putUser = async (req, res) => {
  //Almacenar datos del request
  const { id } = req.params;
  const { _id, pass, google, email, ...rest } = req.body;

  //Comprobar y establecer nueva contraseña encriptada
  if (pass) {
    //Encriptar contraseña
    const salt = bcryptjs.genSaltSync();
    rest.pass = bcryptjs.hashSync(pass, salt);
  }

  //Actualizar registro
  const user = await User.findByIdAndUpdate(id, rest, { new: true });

  res.json({
    user,
  });
};

//* ELIMINAR Usuario por su ID
const deleteUsers = async (req, res) => {
  // Recuperar id
  const { id } = req.params;

  //! Eliminar físicamente
  //const user = await User.findByIdAndDelete(id);

  // Cambiar status
  const user = await User.findByIdAndUpdate(
    id,
    { status: false },
    { new: true }
  );

  res.json({
    user,
  });
};

//* Exportar Funciones
module.exports = {
  getUsers,
  getUsersPaginated,
  getUsersById,
  postUsers,
  putUser,
  deleteUsers,
};
