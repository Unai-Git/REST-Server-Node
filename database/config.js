//* Importaciones de terceros
const mongoose = require("mongoose");

//* Configuración de la base de datos
const dbConnection = async () => {
  try {
    //Establecer Conexión
    await mongoose.connect(process.env.MONGO_CNN);
    console.log("Conectado correctamente a la base de datos");
  } catch (error) {
    throw new Error("Error en la conexión con la base de datos");
  }
};

//* Exportar Conexión
module.exports = { dbConnection };
