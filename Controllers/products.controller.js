//* Importaciones de terceros

//*  Importaciones Internas
const Product = require("../models/product");

//* Obtener Todos los Productos
const getProducts = async (req, res) => {
  //Recoger parámetro limite
  const { limit = 4, since = 0 } = req.query;

  //Ejecutar promesas de forma simultanea
  const [total, products] = await Promise.all([
    Product.countDocuments({ status: true }),
    Product.find({ status: true })
      .populate("user", "name")
      .populate("category", "name")
      .skip(Number(since))
      .limit(Number(limit)),
  ]);

  res.json({
    total,
    products,
  });
};

//* Obtener un Producto por su Id
const getProductById = async (req, res) => {
  //const id = req.params.id;
  const { id } = req.params;

  //Recuperar producto por id
  const product = await Product.findById(id)
    .populate("user", "name")
    .populate("category", "name");

  res.json({
    product,
  });
};

//* Crear un nuevo Producto
const createProduct = async (req, res) => {
  // Extraer datos ignorando el estado y el usuario
  const { status, user, ...body } = req.body;

  // Comprobar si existe ese producto
  const productBD = await Product.findOne({ name: body.name });

  if (productBD) {
    return res.status(400).json({
      msg: `El producto ${productBDs.name}, ya existe.`,
    });
  }

  // Generar data para guardar en la BBDD
  const data = {
    ...body,
    name: body.name.toUpperCase(),
    user: req.user._id,
  };

  // Instanciar categoría con los datos
  const product = new Product(data);

  // Guardar en la BBDD
  await product.save();

  // feedback de creación
  res.status(201).json({
    product,
  });
};

//* Actualizar un producto por su Id
const updateProduct = async (req, res) => {
  //Almacenar datos del request
  const { id } = req.params;

  // Evitar que manden ciertos campos
  const { status, user, ...data } = req.body;

  // Pasar nombre de la categoría en mayúsculas
  if (data.name) {
    data.name = data.name.toUpperCase();
  }

  // Establecer usuario
  data.user = req.user._id;

  //Actualizar registro
  const product = await Product.findByIdAndUpdate(id, data, { new: true });

  // Feedback de los datos actualizados
  res.json({
    product,
  });
};

//* Eliminar un producto por su Id
const deleteProduct = async (req, res) => {
  // Recuperar id
  const { id } = req.params;

  // Cambiar status
  const product = await Product.findByIdAndUpdate(
    id,
    { status: false },
    { new: true }
  );

  res.json({
    product,
  });
};

//* Exportar Funciones
module.exports = {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
};
