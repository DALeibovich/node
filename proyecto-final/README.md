# PROYECTO FINAL

## Segunda entrega
#### .env (se puede setear DB_ENGINE a mongodb, mysql, sqlite3, firebase, archivo, memoria)

### Configuraciones conexiones a DATABASE
#### /config/ [mysql.js | sqlite.js | firebase.js | mongodb.js]
### Estructura DAO's
#### /models/ [ContenedorArchivo.js | ContenedorMemoria.js | KnexDB.js | KnexDB_MySql.js | KnexDB_SQLite3.js | MongoDB.js | FirebaseDB.js ]
#### /daos/ [importarClases.js  | modelo.*]
#### /daos/carritos/ [*DaoArchivo.js | *DaoMemoria.js | *DaoFirebase.js | *DaoMongodb.js | *DaoSqlite.js | DaoMysql.js]
#### /daos/productos/ [*DaoArchivo.js | *DaoMemoria.js | *DaoFirebase.js | *DaoMongodb.js | *DaoSqlite.js | DaoMysql.js]
## Primera entrega

#### .env (se puede setear el PORT y ADMINISTRADOR para bloquear la ruta api.- reiniciar el server despues de modificar)

#### Postman collection: /primera-entrega.postman_collection.json

#### Ejecutar ./index.js

### Estructura de archivos
#### /models/ [Contenedor.js | Productos.js | Carrito.js]
#### /controllers/ [productos.js | carritos.js]
#### /middlewares/ [controlAccesoApi.js]
#### /routes/ [productos.js | carritos.js]
#### /DB/ [productos.json | carritos.json]
#### / [.env | index.js | package.json | primera-entrega.postman_collection.json]
