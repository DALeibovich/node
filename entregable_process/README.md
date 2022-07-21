# PROCESS + FORK + MINIMIST 

## Ejecución
1) ejecutar node ./server.js --port xxxx

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

