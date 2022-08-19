//* Importaciones de terceros
const { isValidObjectId } = require("mongoose");

//* Importaciones Internas
const User = require("../models/user");
const Category = require("../models/category");
const Products = require("../models/product");
const category = require("../models/category");

//* Variables
const allowedCollections = ["users", "categories", "products", "roles"];

//* Buscar usuarios nombre/id/email
const searchUsers = async (term = "", res) => {
  // Comprobar si es un id
  const isMongoId = isValidObjectId(term);

  if (isMongoId) {
    const user = await User.findById(term);

    res.json({
      results: user ? [user] : [],
    });
  }

  // Buscar un en el obj lo que coincida con el termino(Buscar por Nombre)
  const regexp = new RegExp(term, "i"); // Evitar problemas con mayúsculas-minúsculas
  const user = await User.find({
    $or: [{ name: regexp }, { email: regexp }],
    $and: [{ status: true }],
  });

  res.json({
    results: user,
  });
};

//* Buscar Categoría
const searchCategory = async (term = "", res) => {
  // Comprobar si es un id
  const isMongoId = isValidObjectId(term);

  if (isMongoId) {
    const category = await Category.findById(term);

    res.json({
      results: category ? [category] : [],
    });
  }

  // Buscar un en el obj lo que coincida con el termino(Buscar por Nombre)
  const regexp = new RegExp(term, "i"); // Evitar problemas con mayúsculas-minúsculas
  const category = await Category.find({ name: regexp, status: true });

  res.json({
    results: category,
  });
};

//* Buscar Producto
const searchProducts = async (term = "", res) => {
  // Comprobar si es un id
  const isMongoId = isValidObjectId(term);

  if (isMongoId) {
    const products = await Products.findById(term).populate("category", "name");

    res.json({
      results: products ? [products] : [],
    });
  }

  // Buscar un en el obj lo que coincida con el termino(Buscar por Nombre)
  const regexp = new RegExp(term, "i"); // Evitar problemas con mayúsculas-minúsculas
  const products = await Products.find({ name: regexp, status: true }).populate(
    "category",
    "name"
  );

  res.json({
    results: products,
  });
};

//* Buscador
const search = (req, res) => {
  // Recoger parámetros
  const { collection, term } = req.params;

  // Comprobar colecciones
  if (!allowedCollections.includes(collection)) {
    return res.status(400).json({
      msg: `${collection} no pertenece a ninguna colección. Sugerencias: [${allowedCollections}]`,
    });
  }

  switch (collection) {
    case "users":
      searchUsers(term, res);
      break;
    case "categories":
      searchCategory(term, res);
      break;
    case "products":
      searchProducts(term, res);
      break;

    default:
      res.status(500).json({
        msg: "Esta búsqueda no esta permitida.",
      });
  }
};

//* Exportar funciones
module.exports = { search };
