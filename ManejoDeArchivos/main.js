const Contenedor = require("./contenedor");

const productoUno = new Contenedor("Celular", 100000, "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQLBe9IALeU_ueNTJrif2j-96BWjGx_7_A6SgMlnNqrxATeqGGq3pHKhyx-JoqxxEaVGdI&usqp=CAU")
const productoDos = new Contenedor("Tablet", 150000, "https://www.macstation.com.ar/img/productos/2907-2829-2450-1.jpg")
const productoTres = new Contenedor("Notebook", 200000, "https://cnnespanol.cnn.com/wp-content/uploads/2021/10/MacBook-2.jpg?quality=100&strip=info")

productoUno.save(productoTres
    ); 

/* productoTres.getAll();   */

/* productoTres.getById(2);  */

/* productoTres.deleteById(4); */

/* productoTres.deleteAll(); */
