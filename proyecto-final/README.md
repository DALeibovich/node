# PROYECTO FINAL

## Entrega final
```
Deploy Heroku:
https://proyecto-final-nodejs.herokuapp.com

Demo cliente: demo | clave: 1234
Demo admin: admin | clave: 123

Instalación
npm i

Ejecución Producción:
npm start | node ./server_factory.js   

Ejecución Desarrollo:
npm run dev | node ./server_factory.js --persistence=MONGOLOCAL  

Ejecucion modo cluster:
npm run start-cluster | node ./server_factory.js --modo="cluster"   
npm run dev-cluster | node ./server_factory.js --modo="cluster" --persistence=MONGOLOCAL  

```

### FUNCIONALIDADES 
#### Vista pública
``` 
-Login de usuarios
-Registro de usuarios (perfil cliente y administrador a modo de test - Envia email de registro)

```
#### Vista Cliente (logueado con perfil "cliente") 
```
-Shopping de libros (Lista, filtra por genero y visualiza detalle)
-Carrito de compra (Visaulizar carrito, agregar producto, quitar producto, seleccionar cantidad, personalizar pedido por producto, control de stock, finalizar compra, generador de ordenes, envio de email del pedido, envio SMS y Whatsapp a traves de Twillio)
-Gestor de pedidos (Lista pedidos realizados, detalle del pedidos)
-Chat/ayuda (Chat con el administrador predefinido)
-Edicion del perfil de usuario cliente con foto
-Salir (cerrar sesion)

```

#### Vista Administrador (logueado con perfil "Administrador")
```
-Shopping de libros (CRUD de productos con stock y selector de genero/categoria)
-Gestor de pedidos (Lista pedidos de todos los clientes, detalle de pedidos)
-Centro de atención (Listado de clientes, chat individual por cliente)
-Config (Visualiza procesos y configuracion del entorno)
-Edicion del perfil de usuario administrador con foto
-Salir (cerrar sesion)

```
#### Vista API's 
```
-Productos (Crear, Listar, Modificar y Eliminar)
-Carrito (Crear, Listar, Modificar, Eliminar - Agregar, Quitar y Listar productos)
-Ordenes (Listar, detalle)
-Usuarios (Crear, Listar, Modificar y Eliminar)

Endoponints disponibles
(Ver colección de postman: /API-PROYECTO-FINAL.postman_collection.json)
```
#### Enpoints
<img src="/proyecto-final/docs/api-postman.png" width="420"  alt="routes"/>

#### Caracteristicas generales
```
-Ejecucion en modo FORK o CLUSTER
-Registro de Logs (Warning y Errors)
-Compresion y Normalizacion información transmitida en chat
-HTML on wire (Motor de Plantilla Handelbars - hbs)
-Validación con strategia de passport local
```

#### Estructura Modelo Vista Controlador utilizada
```
/server_factory.js
/config/
/routes/
/middlewares/
/controllers/
/views/
/models/
/services/
/daos/
/dtos/
/utils/
/DB/
/public/
/docs/
/logs/

```

#### Ejemplos de comunicaciones
<img src="/proyecto-final/docs/img/gmail.jpeg" width="420"  alt="Gmail"/>
<img src="/proyecto-final/docs/img/sms.jpeg" width="420"  alt="SMS"/>
<img src="/proyecto-final/docs/img/whatsapp.jpeg" width="420"  alt="Whatsapp"/>

#### Pantallas vista publica
<img src="/proyecto-final/docs/img/login.png" width="420"  alt="Libreria Coderhouse"/>
<img src="/proyecto-final/docs/img/registrarse.png" width="420"  alt="Libreria Coderhouse"/>

#### Pantallas vista cliente
<img src="/proyecto-final/docs/img/libreria.png" width="420"  alt="Libreria Coderhouse"/>
<img src="/proyecto-final/docs/img/producto_detalle.png" width="420"  alt="Libreria Coderhouse"/>
<img src="/proyecto-final/docs/img/carrito.png" width="420"  alt="Libreria Coderhouse"/>
<img src="/proyecto-final/docs/img/ordenes.png" width="420"  alt="Libreria Coderhouse"/>
<img src="/proyecto-final/docs/img/ordenes_detalle.png" width="420"  alt="Libreria Coderhouse"/>
<img src="/proyecto-final/docs/img/chat.png" width="420"  alt="Libreria Coderhouse"/>


#### Pantallas vista administrador
<img src="/proyecto-final/docs/img/admin_productos.png" width="420"  alt="Libreria Coderhouse"/>
<img src="/proyecto-final/docs/img/admin_config.png" width="420"  alt="Libreria Coderhouse"/>
<img src="/proyecto-final/docs/img/admin_chat.png" width="420"  alt="Libreria Coderhouse"/>
<img src="/proyecto-final/docs/img/ordenes.png" width="420"  alt="Libreria Coderhouse"/>
<img src="/proyecto-final/docs/img/ordenes_detalle.png" width="420"  alt="Libreria Coderhouse"/>
<img src="/proyecto-final/docs/img/perfil.png" width="420"  alt="Libreria Coderhouse"/>
