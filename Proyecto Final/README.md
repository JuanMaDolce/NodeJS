# Proyecto Final curso NODEJS

El proyecto consta en la creación del backend de un carrito de compras

## Breve Introducción

Como base de datos se utiliza MongoDB Atlas a través de Mongoose, donde se almacenarán los distintos productos, carritos y usuarios (con sus datos y passwords encriptados con Bcrypt) para la creación de validaciones de usuario se utiliza passport y passport-local y para el front end se utiliza como motor de plantilla EJS.

Las sesiones se gestionan con express-session

Cada Router presenta los endpoints a aplicar dependiendo de la sección del proyecto que ejecute, sea el inicio de sesión, el carrito y pedidos, la gestión de productos o el chat

Las operaciones y controladores se dividen de la misma manera en Contenedores serparados por sección

Sobre los accesos y variables globales de ejecución, se encuentran en el código, debierndo incorporarse en un archivo externo que no ser;a incluido en el repositorio al momento de desenvolver el proyecto en un entorno de ejecución; posteriormente se incluirá en un archivo .ENV.

## Inicialización del Servidor

Es posible iniciar el servidor desde el archivo server.js, de desearse podría ser utilizando como parámetro por consola el comando CLUSTER o FORK, dependiendo de cómo se desee inicializar el proyecto.

## Tecnologías Usadas

Nodejs v16.17.0
Bcrypt ^5.1.0
Dotenv ^16.0.2
Ejs ^3.1.8
Env ^0.0.2
Express ^4.18.1
Express-session ^1.17.3
Mongoose ^6.6.0
Multer ^1.4.5-lts.1
Nodemailer ^6.8.0
Passport ^0.6.0
Passport-local ^1.0.0
Socket.io ^4.5.4
Twilio ^3.83.1
Winston ^3.8.2

## EndPoints

### Sesión

GET Ingreso al Registro del usuario - http://localhost:8080//registro

POST Registro del usuario - http://localhost:8080/registro

GET Ingreso al Ingreso del usuario - http://localhost:8080/registro

POST Ingreso del usuario - http://localhost:8080/registro

GET Ingreso al Home y sus posibles accesos - http://localhost:8080/registro

GET Logout - http://localhost:8080/logout

### Productos

GET Trae todos los productos - http://localhost:8080/api/producto

GET Trae un producto por ID - http://localhost:8080/api/producto/:id

GET Trae un producto por - categoría http://localhost:8080/api/producto/prod/:categoria

POST Ingresa un producto - http://localhost:8080/api/producto/

PUT Modifica un producto seleccionado por ID - http://localhost:8080/api/producto/:id

DELETE Elimina un producto por ID - http://localhost:8080/api/producto/:id

### Carrito

GET Muestra todos los datos del carrito - http://localhost:8080/api/carrito

GET Muestra los productos del carrito seleccionado por ID - http://localhost:8080/api/carrito/:id/productos

POST Crea un carrito - http://localhost:8080/api/carrito/

POST Crea el pedido - http://localhost:8080/api/carrito/pedido

POST Ingresa un producto al carrito por ID del producto - http://localhost:8080/api/carrito/:id/productos

DELETE Elimina un carrito por ID - http://localhost:8080/api/carrito/:id

DELETE Elimina un producto del carrito por ID - http://localhost:8080/api/producto/:id/carrito/:id_prod

## Chats

GET visualización de Chats - http://localhost:8080/chat

GET visualización de los Chats por Email - http://localhost:8080/chat/:chat

## Pedidos

GET visualización de Pedidos - http://localhost:8080/chat

GET visualización de los Pedidos por ID de orden - http://localhost:8080/chat/:chat

## Pruebas

Las pruebas de los EndPoint pueden ser realizadas por POSTMAN o verificar su configuración en el archivo .REST





