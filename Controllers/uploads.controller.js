//* Importaciones de terceros
const path = require("path");
const fs = require("fs");

//* Importaciones Internas
const { uploadFiles } = require("../helpers/uploads");
const User = require("../models/user");
const Product = require("../models/product");

//* Globales
const allowedExtensions = {
  img: ["png", "jpg", "jpeg", "gif", "webp"],
  txt: ["txt", "md"],
};

//* Cargar Archivos
const chargeFiles = async (req, res) => {
  try {
    // Imágenes. uploadFiles(extension = default Array)
    const name = await uploadFiles(req.files, allowedExtensions.img, "img");

    // txt y md
    //const name = await uploadFiles(req.files,allowedExtensions.txt, "text");

    // Feedback subida
    res.json({
      name,
    });
  } catch (error) {
    res.status(400).json({
      error,
    });
  }
};

//* Actualizar Imagen
const updateImage = async (req, res) => {
  // Desestructurar parámetros
  const { collection, id } = req.params;

  //Comprobar si existe el usuario/producto en la BBDD
  let model;

  switch (collection) {
    case "users":
      model = await User.findById(id);
      if (!model) {
        return res.status(400).json({
          msg: `No existe un usuario con este id: ${id}`,
        });
      }
      break;

    case "products":
      model = await Product.findById(id);
      if (!model) {
        return res.status(400).json({
          msg: `No existe un producto con este id: ${id}`,
        });
      }
      break;

    default:
      return res.status(500).json({
        msg: "Error al actualizar la imagen",
      });
  }

  //Limpiar imágenes previas
  if (model.img) {
    // Ruta de la imagen
    const imgPath = path.join(__dirname, "../uploads", collection, model.img);
    // Comprobar si existe
    if (fs.existsSync(imgPath)) {
      fs.unlinkSync(imgPath); // Borrar Archivo
    }
  }

  // Actualizar IMG
  model.img = await uploadFiles(req.files, allowedExtensions.img, collection); // Collection = nombre de la carpeta

  // Guardar en la BBDD
  await model.save();

  // FeedBack
  res.json({
    model,
  });
};

//* Mostrar Imagen
const showImage = async (req, res) => {
  // Desestructurar parámetros
  const { collection, id } = req.params;

  //Comprobar si existe el usuario/producto en la BBDD
  let model;

  switch (collection) {
    case "users":
      model = await User.findById(id);
      if (!model) {
        return res.status(400).json({
          msg: `No existe un usuario con este id: ${id}`,
        });
      }
      break;

    case "products":
      model = await Product.findById(id);
      if (!model) {
        return res.status(400).json({
          msg: `No existe un producto con este id: ${id}`,
        });
      }
      break;

    default:
      return res.status(500).json({
        msg: "Error al actualizar la imagen",
      });
  }

  //Limpiar imágenes previas
  if (model.img) {
    // Ruta de la imagen
    const imgPath = path.join(__dirname, "../uploads", collection, model.img);
    // Comprobar si existe
    if (fs.existsSync(imgPath)) {
      return res.sendFile(imgPath); // Devolver Imagen
    }
  }

  // Mostrar Img default
  const defaultImg = path.join(__dirname, "../public/assets/img/no-image.jpg");
  res.sendFile(defaultImg);
};

//* Exportar funciones
module.exports = { chargeFiles, updateImage, showImage };
