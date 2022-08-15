//* Importaciones de terceros
require("dotenv").config();

//* Importaciones Internas
const Server = require("./models/server");

//* Instanciar clase Server
const server = new Server();

//* LLamar clase Server
server.listen();
