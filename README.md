<h1 align="center" > REST-Server-Node </h1>

<hr>

## Contenido del REST-SERVER:
- Operaciones CRUD: Usuarios(con roles), productos y categorías.
- MongoDB establecer conexión, crear modelos(Usuarios,productos y categorías) con sus validaciones.
- Uso de Google Sign-In.
- Buscador interno.
- Subir archivos(Imágenes,Texto).

## Instalar:

```sh
npm install
```

## Ejecutar(Necesario Nodemon)

```sh
npm run start
```

## NPM:

- **bcryptjs [^2.4.3]** Encriptar contraseña.
- **cors [^2.8.5]** Para prevenir que el dominio A evite acceder a recursos del dominio B usando solicitudes del tipo AJAX o XMLHttpRequest.
- **dotenv [^16.0.1]** Para configurar variables de entorno.
- **express [^4.18.1]** Enrutado, inicia un servidor y asignar un puerto de escucha.
- **express-validator [^6.14.2]** Validar campos.
- **mongoose [^6.5.2]** Escribir consultas para una base de datos de MongooDB.
- **jsonwebtoken [^8.5.1]** Generar tokens para autenticación.
- **google-auth-library [^8.2.0]** Verificar el Google ID Token en el lado del servidor.
- **express-fileupload [^1.4.0]** Subir archivos.
- **uuid [^8.3.2]** Crear Identificadores únicos.
