/*************CONEXION A DB******************* */
// Llama a la cracion de tablas en Mysql y SQLite3, abriendo la conexion con KnexDB
//require('./scriptTables');

const express = require('express');
const session = require('express-session');
const cookieParser = require("cookie-parser");
const app = express();
const path = require('path');
const { emitirProductosSocket, agregarProductoSocket } = require('./controllers/productos');
const { emitirMensajesSocket, agregarMensajeSocket } = require('./controllers/foros');
const storeMongo = require("connect-mongo");
const mongodbconn = require('./controllers/config/mongodb');
const { emitirLogin } = require('./controllers/login');

/**********CONFIGURACION DEL ENTORNO ************************************************ */
// para capturar tipos de datos y no solo string
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
// para que tome la carpeta publica or defecto y el index.html contenido
app.use(express.static(path.join(__dirname, 'public')));


/******SESISONES */

app.use( session({
    store: storeMongo.create({
      mongoUrl: mongodbconn,
      ttl: 10 * 60, // Esto creo que son los 10 minutos del enunciado
      mongoOptions: { useNewUrlParser: true, useUnifiedTopology: true },
    }),
    key: "user_sid",
    secret: "c0d3R",
    rolling:true, // renueva el tiempo de vida de la cookie
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 60000 }, // 60 segundos: 1 minto para la cookie local
  }))
  

/******** SERVER WEBSOCKET *************************************************/
const server = require('http').Server(app);
const io = require('socket.io')(server);
// escuchamos la conexion del socket
io.on('connection', function (socket) {
    let socket2 = socket;
    //emitimos los productos a los clientes
    emitirProductosSocket(io, socket);
    //Agregamos un producto enviado por el cliente
    agregarProductoSocket(io, socket);

    //emitimos los mensajes del foro
    emitirMensajesSocket(io, socket);
    //Agregamos un mensaje al foro
    agregarMensajeSocket(io, socket, app);

    emitirLogin( io, socket, session);
});



/******** SERVER WEB *****************************************************************/
const PORT = process.env.PORT || 8080;
const serv = server.listen(PORT, () => {
    console.log('listening on port', serv.address().port);
})
serv.on('error', err => console.error('listening on port', err));




/******** PARTE DEL ENTREGABLE MOTORES DE PLANTILLAS *****************************************/
// conservo del entregable anterior
const handlebars = require('express-handlebars');
const { engine } = handlebars;
const productos = require('./routes/productos');

app.engine(
    "hbs",
    engine({
        extname: ".hbs",
        defaultLayout: "index",
    })
);

app.set("views", "./views"); //especifica el directorio
app.set("view engine", "hbs");


const controlLogin = require('./middlewares/controlLogin');
app.use('/',controlLogin)

// ruteo de login
const login = require('./routes/login');
app.use('/', login);


// ruteo para los productos
app.use('/', productos);

// Se podria usar un middleawre
//const controlLogin = require('./middlewares/controlLogin');
//app.use('/', controlLogin);




// por default si no encuetra una ruta especifica
app.use((req, res) => {
    res.send('endPoint no encontrado')
});


