//* Importaciones de terceros
const express = require("express");
const cors = require("cors");
const fileUpload = require("express-fileupload");

//*  Importaciones Internas
const { dbConnection } = require("../database/config");

//* Clase Server
class Server {
  // Constructor
  constructor() {
    //Variables
    this.app = express();
    this.port = process.env.PORT;
    this.paths = {
      usersPath: "/api/users",
      authPath: "/api/auth",
      categoriesPath: "/api/categories",
      productsPath: "/api/products",
      searchPath: "/api/search",
      uploadPath: "/api/uploads",
    };

    // LLamadas a las funciones
    this.connectDB();
    this.middlewares();
    this.routes();
  }

  // Conectarse a la Base de Datos
  async connectDB() {
    await dbConnection();
  }

  // Middleware
  middlewares() {
    // CORS
    this.app.use(cors());

    // Lectura y Parseo del body(Serializar la data del del body a json)
    this.app.use(express.json());

    // Evitar que la carpeta estática "public" forme parte de la URL
    this.app.use(express.static("public"));

    // FileUpload Cargar archivos
    this.app.use(
      fileUpload({
        useTempFiles: true,
        tempFileDir: "/tmp/",
        createParentPath: true, // Si no existe la capeta la crea (Cuidado con esto)
      })
    );
  }

  // Manejo de Rutas
  routes() {
    // Asociar fichero de rutas a una ruta especifica
    this.app.use(this.paths.authPath, require("../routes/auth.routes"));
    this.app.use(this.paths.usersPath, require("../routes/user.routes"));
    this.app.use(
      this.paths.categoriesPath,
      require("../routes/categories.routes")
    );
    this.app.use(this.paths.productsPath, require("../routes/products.routes"));
    this.app.use(this.paths.searchPath, require("../routes/search.routes"));
    this.app.use(this.paths.uploadPath, require("../routes/uploads.routes"));
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
