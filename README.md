# Entrega Final del Curso de PROGRAMACION BACKEND I de CODERHOUSE

### Descripción del proyecto:

Desarrollo de un servidor basado en Node.JS y express. Contiene los endpoints y servicios necesarios para gestionar los productos y carrito de compras de un E-commerce.
Escucha en el puerto 8080 y tiene los grupos de rutas /api/products, /api/carts y api/sessions.
Incorpora:

- el motor de plantillas Handlebars para las vistas,
- websockets,
- Mongo como sistema de persistencia,
- sistema de auntorización y autenticación.

### Pasos para probar el proyecto:

- Desde una terminal clonar el proyecto en su máquina local

```batch
git clone https://github.com/ingridlch/Entrega1Backend2.git
```

- Situarse en el directorio del proyecto que se creó al clonar e instalarlo con:

```batch
npm install
```

### Endpoints de la API

Se incluyen capturas de pruebas realizadas en Postman que demuestran su funcionamiento.

**GET** `/api/products`: Obtiene la lista de productos, acepta parámetros por query:

- limit: permite devolver sólo el número de elementos indicados, en caso de no recibir el valor por defecto es 10.
- page: permite devolver la página que se quiere buscar, en caso de no recibir el valor por defecto es 1.
- query: permite buscar por categoría o disponibilidad, en caso de no recibir no hace filtro.
- sort: asc/desc permite devolver el listado ordenado por precio, en caso de no recibir no realiza ordenamiento.
  ![GET /products](./src/public/images/GETproducts.jpg)

**GET** `/api/products/:pid`: Obtiene el producto correspondiente al id pasado en el parámetro pid.\
![GET /products](./src/public/images/GETproducts2.jpg)

**POST** `/api/products`: Crea un nuevo producto. Todos los campos son obligatorios exceptuando thumbnails: title:String, description:String, code:String, price:Number, stock:Number, category:String, thumbnails:Array de Strings que contiene las rutas a las imágenes del producto. \
![POST /products](./src/public/images/POSTproducts.jpg)

**PUT** `/api/products/:pid`: Actualiza el producto correspondiente al id pasado en el parámetro pid con los campos enviados desde el body.
![PUT /products/:pid](./src/public/images/PUTproducts2.jpg)

**DELETE** `/api/products/:pid`: Elimina el producto correspondiente al id pasado en el parámetro pid.
![DELETE /products/:pid](./src/public/images/DELETEproducts2.jpg)

**POST** `/api/carts`: Crea un nuevo carrito. Recibe desde el body el array products que contiene los objetos que representan cada producto con las propiedades product (entero con el id del producto) y quantity (entero que contiene el número de ejemplares del producto).
![POST /carts](./src/public/images/POSTcarts.jpg)

**GET** `/api/carts/:cid`: Lista los productos del carrito correpondiente al id pasado en el parámetro cid con su detalle.
![GET /carts/:cid](./src/public/images/GETcarts1.jpg)

**POST** `/api/carts/:cid/product/:pid`: Agrega el producto cuyo id se pasa en el parámetro pid con el carrito de id cid. Si el producto ya estaba en el carrito aumenta su cantidad en una unidad.
![POST /carts/product](./src/public/images/POSTcartsproduct.jpg)

**DELETE** `api/carts/:cid/products/:pid`: Elimina del carrito el producto seleccionado
![POST /carts/product](./src/public/images/DELETEcartsproducts.jpg)

**PUT** `api/carts/:cid`: Actualiza el carrito con un arreglo de productos. Recibe desde el body el array products que contiene los objetos que representan cada producto con las propiedades product (entero con el id del producto) y quantity (entero que contiene el número de ejemplares del producto).
![POST /carts/product](./src/public/images/PUTcarts.jpg)

**PUT** `api/carts/:cid/products/:pid`: Actualiza sólo la cantidad de ejemplares del producto pasado en el parámetro :pid para el carrito :cid. La cantidad se pasa en el parámetro quantity del body.
![POST /carts/product](./src/public/images/PUTcartsproducts.jpg)

**DELETE** `api/carts/:cid`: Elimina los productos del carrito.
![POST /carts/product](./src/public/images/DELETEcarts.jpg)

**POST** `api/sessions/register`: Crea un usuario con los parámetros pasados en el body: first_name:String, last_name:String, email:String (único), age:Number, password:String, cart:id con referencia a Carts, role:String.
![POST /carts/product](./src/public/images/POSTsessionsRegister.jpg)

**POST** `api/sessions/login`: Permite el login de un usuario con los parámetros pasados por body: email y password.
![POST /carts/product](./src/public/images/POSTsessionsLogin.jpg)

**GET** `api/sessions/current`: Valida el usuario logueado y devuelve en una respuesta sus datos.
![GET /carts/product](./src/public/images/GETsessionsCurrent.jpg)

**PUT** `api/sessions/:id`: Actualiza el usuario del id pasado en el parámetro :id con los parámetros pasados en el body.
![PUT /carts/product](./src/public/images/PUTsessions.jpg)

**DELETE** `api/sessions/:id`: Elimina el usuario con el id pasado en el parámetro :id.
![DELETE /carts/product](./src/public/images/DELETEsessions.jpg)

### Vistas

Se incluyen imágenes de pruebas que demuestran su funcionamiento.

`/products`: Devuelve la lista de productos con su respectiva paginación. Puede recibir distintos parámetros por query: limit, page, query y sort
![/](./src/public/images/products.jpg)

`/carts/:cid`: Visualiza un carrito específico listando sólo los productos que pertenecen a ese carrito
![/](./src/public/images/carts.jpg)

`/realtimeproducts`: Devuelve la vista “realTimeProducts.handlebars” que contiene la lista de productos que trabaja con websockets para que se vaya actualizando en tiempo real.
