# ABSTRACCION EN CAPAS

```
Se dividio en capas la generacion de productos a traves de Faker, los cuales que se muestran por websocket y por api.

ejecutar: node .\server.js o npm start

```


### Estructura de archivos modificada/creada
```
RUTEO
/routes/productos.routes.js

CONTROLADOR
/controllers/productos.controllers.js

SERVICIO
/services/productos.services.js

PERSISTENCIA
/daos/productos.DaoFaker.js
/daos/models/DaoFaker.js
-----
/daos/models/DaoArchivos.js
/daos/models/DaoMemoria.js
/daos/models/DaoMongoDB.js
/daos/models/DaoMysql.js
/daos/models/DaoMSqlite3.js
```