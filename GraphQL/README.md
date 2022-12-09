Proyecto Final curso NODEJS
El proyecto consta en la creación del backend de un carrito de compras

Inicialización del servidor
Es posible iniciar el servidor desde el archivo sedrver.js, utilizando como parámetro por consola el comando CLUSTER o FORK, dependiendo de cómo se desee inicializar el proyecto.

El Proyecto

Como base de datos se utiliza MongoDB Atlas a través de Mongoose, donde se almacenarán los distintos productos, carritos y usuarios (con sus datos y passwords encriptados con Bcrypt) para la creación de validaciones de usuario se utiliza passport y passport-local y para el front end se utiliza como motor de plantilla EJS.

Las sesiones se gestionan con express-session

Cada Router presenta los endpoints a aplicar dependiendo de la sección del proyecto que ejecute, sea el inicio de sesión, el carrito o la gestión de productos.

Las operaciones y controladores se dividen de la misma manera en Contenedores serparados por sección

Sobre los accesos y variables globales de ejecución, se encuentran en el código, debierndo incorporarse en un archivo externo que no ser;a incluido en el repositorio al momento de desenvolver el proyecto en un entorno de ejecución; posteriormente se incluirá en un archivo .ENV.
