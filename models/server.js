//* Importaciones de terceros
const express = require("express");
const cors = require("cors");

//* Clase Server
class Server {
  // Constructor
  constructor() {
    //Variables
    this.app = express();
    this.port = process.env.PORT;
    this.usersPath = "/api/users";

    // LLamadas a las funciones
    this.middlewares();
    this.routes();
  }

  // Middleware
  middlewares() {
    // CORS
    this.app.use(cors());

    // Lectura y Parseo del body(Serializar la data del del body a json)
    this.app.use(express.json());

    // Evitar que la carpeta estática "public" forme parte de la URL
    this.app.use(express.static("public"));
  }

  // Manejo de Rutas
  routes() {
    // Asociar fichero de rutas a una ruta especifica
    this.app.use(this.usersPath, require("../routes/user.routes"));
  }

  // Puerto de escucha
  listen() {
    this.app.listen(this.port, () => {
      console.log("Ejecutándose en el puerto " + this.port);
    });
  }
}

//*Exportar Clase Server
module.exports = Server;
