# FRAMEWORK KOA



```
Ejecución server:  node ./server_koa.js

```

### MODULOS KOA
```
    "koa": "^2.13.4",
    "koa-body": "^5.0.0",
    "koa-bodyparser": "^4.3.0",
    "koa-json": "^2.0.2",
    "koa-router": "^12.0.0",
    "koa-session": "^6.2.0",
    "koa-static": "^5.0.0",
    "koa-views": "^8.0.0",
    "koa-views-handlebars": "^0.1.1",
    
```

### Estructura de archivos modificada/creada
```

SERVER
/server_koa.js

RUTEO
/routes/productos.routes.js
/routes/foros.routes.js

CONTROLADOR
/controllers/productos.controllers.js
/controllers/foros.controllers.js

SERVICIO
/services/productos.services.js
/services/foros.services.js

PERSISTENCIA
/daos/productos/factoryPersistence.js
/daos/productos/ [productos.archivo.dao.js, productos.mongodb.dao.js, productos.memoria.dao.js, productos.firebase.dao.js, productos.mysql.dao.js, productos.sqlite3.dao.js, , faker.sqlite3.dao.js]
/daos/models/DaoFaker.js

/daos/foros/factoryPersistence.js
/daos/foros/ [foros.archivo.dao.js, foros.mongodb.dao.js, foros.memoria.dao.js, foros.firebase.dao.js, foros.mysql.dao.js, foros.sqlite3.dao.js]

-----
/daos/models/DaoArchivos.js
/daos/models/DaoMemoria.js
/daos/models/DaoMongoDB.js
/daos/models/DaoMysql.js
/daos/models/DaoMSqlite3.js

DTOs:
/dtos/foros.dto.js

VIEWS:
/public/plantillas/mensajes.hbs

CONFIG
/config/config.js
/config/[firebase.js, mongodb.js, mysql.js, sqlite3.js]
```