# PROYECTO FINAL

## Tercera entrega
```
Deploy Heroku:
https://proyecto-final-nodejs.herokuapp.com
```
#### Postman collection: /tercera-entrega.postman_collection.json
#### Ejemplos de comunicaciones
<img src="/proyecto-final/docs/gmail.jpeg" alt="Gmail"/>
<img src="/proyecto-final/docs/sms.jpeg" alt="SMS"/>
<img src="/proyecto-final/docs/whatsapp.jpeg" alt="Whatsapp"/>

### Estructura agregada
```
/middlewares/[controlLoginPassportLocal.js, logs.js, compresion.js]
/logs/[error.js, warn.js]
/models/[User.js]
/controllers/[usuarios.js, logs.js]
/controllers/strategy-valitation/localPassport.js
/routes/[usuarios.js, logins.js, shop.js]
/daos/usuarios/ [*DaoArchivo.js | *DaoMemoria.js | *DaoFirebase.js | *DaoMongodb.js | *DaoSqlite.js | DaoMysql.js]
/utils/[bcrypt.js, mailer.js, whatsapp.js, sms.js, winston.js]
/views/layouts/index.js
/views/pages/[carrito.hbs, dashboard.hbs, finalizar.hbs, login.hbs, logout.hbs, perfil.hbs, signup.hbs, finalizar.hbs]
/public/img/users/

```
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
