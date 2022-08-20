//* Validar uploads
const uploadValidation = (req, res, next) => {
  //Comprobar archivo
  if (!req.files || Object.keys(req.files).length === 0 || !req.files.archivo) {
    return res
      .status(400)
      .json("No se ha cargado ningún archivo.");
  }

  next();
};

//* Exportar validación del upload
module.exports = { uploadValidation };
