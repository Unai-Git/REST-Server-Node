//* Importaciones de terceros
const path = require("path");
const { v4: uuidv4 } = require("uuid");

//* Subir Archivos
const uploadFiles = (files, allowedExtensions = [], folder = "") => {
  // Generar Promesa
  return new Promise((resolve, reject) => {
    // Desestructurar archivo
    const { archivo } = files;

    // Obtener extension
    const cutName = archivo.name.split(".");
    const extension = cutName[cutName.length - 1];

    // Validar extensiones
    if (!allowedExtensions.includes(extension)) {
      return reject(
        `La extension ${extension} no es valida. Pruebe con [${allowedExtensions}]`
      );
    }

    // Generar nombre ÚNICO nuevo para los archivos
    const tempName = uuidv4() + "." + extension;

    // Construir ruta donde se guardan los archivos
    const uploadPath = path.join(__dirname, "../uploads/", folder, tempName);

    // Mover archivo a la ruta construida(uploadPath) y si no puede mostrar error
    archivo.mv(uploadPath, (err) => {
      if (err) {
        reject(err);
      }

      // Feedback si sale bien
      resolve(tempName);
    });
  });
};

//* Exportar funciones
module.exports = { uploadFiles };
