//* Importaciones de terceros

//*  Importaciones Internas
const Category = require("../models/category");

//*Obtener Categorías
const getCategories = async (req, res) => {
  //Recoger parámetro limite
  const { limit = 4, since = 0 } = req.query;

  //Ejecutar promesas de forma simultanea
  const [total, categories] = await Promise.all([
    Category.countDocuments({ status: true }),
    Category.find({ status: true })
      .populate("user", "name")
      .skip(Number(since))
      .limit(Number(limit)),
  ]);

  res.json({
    total,
    categories,
  });
};

//*Obtener Categoría por Id
const getCategoryById = async (req, res) => {
  //const id = req.params.id;
  const { id } = req.params;

  //Recuperar categoría por id
  const category = await Category.findById(id).populate("user", "name");

  res.json({
    category,
  });
};

//* Crear Categoría
const createCategory = async (req, res) => {
  // Recuperar nombre y pasarlo a mayúsculas
  const name = req.body.name.toUpperCase();

  // Comprobar si existe esa categoría
  const categoryDB = await Category.findOne({ name });

  if (categoryDB) {
    return res.status(400).json({
      msg: `La categoría ${categoryDB.name}, ya existe.`,
    });
  }

  // Generar data para guardar en la BBDD
  const data = {
    name,
    user: req.user._id,
  };

  // Instanciar categoría con los datos
  const category = new Category(data);

  // Guardar en la BBDD
  await category.save();

  // feedback de creación
  res.status(201).json({
    category,
  });
};

//* ACTUALIZAR Categoría por su ID
const putCategory = async (req, res) => {
  //Almacenar datos del request
  const { id } = req.params;

  // Evitar que manden ciertos campos
  const { status, user, ...data } = req.body;

  // Pasar nombre de la categoría en mayúsculas
  data.name = data.name.toUpperCase();

  // Establecer usuario
  data.user = req.user._id;

  //Actualizar registro
  const category = await Category.findByIdAndUpdate(id, data, { new: true });

  // Feedback de los datos actualizados
  res.json({
    category,
  });
};

//* ELIMINAR Categoría por su ID
const deleteCategory = async (req, res) => {
  // Recuperar id
  const { id } = req.params;

  // Cambiar status
  const category = await Category.findByIdAndUpdate(
    id,
    { status: false },
    { new: true }
  );

  res.json({
    category,
  });
};

//* Exportar Funciones
module.exports = {
  getCategories,
  getCategoryById,
  createCategory,
  putCategory,
  deleteCategory,
};
