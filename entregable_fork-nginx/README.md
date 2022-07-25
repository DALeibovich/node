# FORK-CLUSTERED + NGINX

## Ejecución modo fork o cluster con escucha de modificaciones sobre el codigo
```
a) nodemon .\server.js --port xxxx --modo "fork o cluster"
b) forever -w start .\server.js --port xxxx --modo "fork o cluster"
c) pm2 start .\server.js --watch  -- -- --port xxxx  --modo "fork o cluster" (modo fork o cluster node)
d) pm2 start .\server.js --watch -i x  -- -- --port xxxx (modo cluster pm2)
```
## Consigna configuracion Nginx

```
events {
}

http {
    include       mime.types;

    upstream node_app {
        server localhost:8082;
        server localhost:8083;
        server localhost:8084;
        server localhost:8085;
    }

    server {
        listen 8080;
        location /api/randoms/ {
            proxy_pass http://node_app;
        }
    }

}
```
## Ejemplos y Documentacion
Podemos ejecutar en modo fork o cluster a traves de pm2:
```
Creamos un server fork con un cluster de procesos sobre el puerto 8082:
pm2 start .\server.js --name="Server fork 8082" -f --watch -- -- --port 8082 --modo "cluster"

Creamos un server cluster de procesos sobre el puerto 8083 con maximo de 3 core:
pm2 start .\server.js --name="Server cluster 8083" -f --watch -i 3 -- -- --port 8083 

Creamos un server cluster de procesos sobre el puerto 8084 con maximo de 3 core:
pm2 start .\server.js --name="Server cluster 8084" -f --watch -i 3 -- -- --port 8084 

Creamos un server fork sobre el puerto 8085:
pm2 start .\server.js -f --name="Server fork 8085"  --watch  -- -- --port 8085 --modo "fork"
```
### Modulos necesarios
<br> minimist, dotenv, passport, passport-local, connect-mongo, bcrypt, cookie-parser, cookie-session,  @faker-js/faker, normalizr, express, handlebars, pug, ejs, socket.io, knex, mysql, sqlite3

1) http://127.0.0.1:xxxx/

### PROCESS + FORK + MINIMIST 
#### /server.js
#### /routes/process.js
#### /routes/randoms.js
#### /controllers/randoms.js
#### /controllers/subprocesos/randoms.js
#### /views/layouts/infoProcess.js


### PASSPORT LOCAL -> Estructura realizada
#### /server.js
#### /routes/login.js
#### /models/User.js
#### /middlewares/controlLoginPassportLocal.js
#### /controllers/strategy-validation/localPassport.js
#### /views/layouts/login.hbs
#### /views/layouts/logout.hbs
#### /views/layouts/signup.hbs
#### /public/dashboard.html
#### /public/plantillas/infoLogin.hbs
#### /controllers/config/mongodb.js

### FAKER
#### /controllers/faker.js
#### /controllers/productos.js

### NORMALIZR
#### /DB/foro-normalizr.js
#### /controllers/foros.js
#### /public/main.js

### Estructura de BASE DE DATOS
#### /scriptTables.js
#### /DB/ecommerce.sqlite
#### /models/ [KnexDB.js | Contenedor.js]
#### /controllers/conexionDB.js
#### /controllers/config/ [mysql.js | sqlite3.js]




### Estructura de archivos HTML. HBS, PUG, EJS

<br> /public/index.html
<br> /public/plantillas/productos.hbs
<br> /public/plantillas/mensajes.hbs

<br> /views/productos.hbs
<br> /views/productos.pug
<br> /views/productos.ejs

<br> /views/layouts/index.hbs
<br> /views/layouts/index.pug
<br> /views/layouts/index.ejs

### Estructura de archivos JS
<br>/index.js
<br>/controllers/productos.js
<br>/routes/productos.js
<br>/routes/foros.js
<br>/models/Contenedor.js
<br>/DB/productos.txt
<br>/DB/foros.txt

### endPoints
<br>/productos/hbs
<br>/productos/pug
<br>/productos/ejs

