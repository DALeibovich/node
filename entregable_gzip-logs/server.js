/*************CONEXION A DB******************* */
// Llama a la cracion de tablas en Mysql y SQLite3, abriendo la conexion con KnexDB
//require('./scriptTables');
require('dotenv/config')
const parseArgs = require('minimist');
const cluster = require('cluster');
const core = require('os');

const express = require('express');
const session = require('express-session');
const cookieParser = require("cookie-parser");
const app = express();
const path = require('path');
const { emitirProductosSocket, agregarProductoSocket } = require('./controllers/productos');
const { emitirMensajesSocket, agregarMensajeSocket } = require('./controllers/foros');
const mongoose = require('mongoose');
const storeMongo = require("connect-mongo");
const mongodbconn = require('./controllers/config/mongodb');
const { emitirLogin } = require('./controllers/login');

const passport = require('passport');
const { initializePassport } = require('./controllers/strategy-validation/localPassport');




/**********CONFIGURACION DEL ENTORNO ************************************************ */
// para capturar tipos de datos y no solo string
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use(cookieParser());
// para que tome la carpeta publica or defecto y el index.html contenido
app.use(express.static(path.join(__dirname, 'public')));

const connection = mongoose.connect(process.env.MONGO_DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})



/******** SERVER WEBSOCKET *************************************************/
const server = require('http').Server(app);
const io = require('socket.io')(server);
// escuchamos la conexion del socket
io.on('connection', function (socket) {
    try {
        //let socket2 = socket;
        //emitimos los productos a los clientes
        emitirProductosSocket(io, socket);
        //Agregamos un producto enviado por el cliente
        agregarProductoSocket(io, socket);

        //emitimos los mensajes del foro
        emitirMensajesSocket(io, socket);
        //Agregamos un mensaje al foro
        agregarMensajeSocket(io, socket, app);

        emitirLogin(io, socket, session);
    } catch (err) {
        logger.error(`Mensajes error ${Date()} ${err.code} ${err.message}`)
    }

});





/******SESSIONES */

let baseSession = session({
    store: storeMongo.create({
        mongoUrl: process.env.MONGO_DB,
        ttl: process.env.MONGO_TTL, // 10 * 60 son los 10 minutos del enunciado
        mongoOptions: { useNewUrlParser: true, useUnifiedTopology: true },
    }),
    key: process.env.SESSION_KEY, //"user_sid",
    secret: process.env.SESSION_SECRET, //"c0d3R",
    rolling: true, // renueva el tiempo de vida de la cookie
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: parseInt(process.env.COOKIE_MAXAGE) }, // 60 segundos: 1 minto para la cookie local
});

app.use(baseSession)

// *********  PASSPORT LOCAL ***********//
initializePassport()
app.use(passport.initialize())
app.use(passport.session())



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



//************ MIDDLEWARES *********  */


// middlewares de compresion 
const compresion = require('./middlewares/compresion');
app.use('/', compresion)

// middlewares de logs
const { routerLogger, logger } = require('./middlewares/logs');
app.use(routerLogger)


// middlewares de autorizacion
const controlLogin = require('./middlewares/controlLoginPassportLocal');
app.use('/', controlLogin)

// middlewares ruteo de login
const login = require('./routes/login');
app.use('/', login);



// middlewares ruteo para los productos
app.use('/', productos);

// middlewares de procesos
const procesos = require('./routes/process');
app.use('/', procesos);

// middlewares ruteo de numeros randoms
const randoms = require('./routes/randoms');
app.use('/', randoms);

// por default si no encuetra una ruta especifica
app.use((req, res) => {
    res.send('endPoint no encontrado')
});





/******** SERVER WEB *****************************************************************/
let args = parseArgs(process.argv.slice(2))
//const PORT = process.env.PORT || 8080;
console.log(args._)
//const PORT = args.port || 8080;
const PORT = args.port || args._[0] || 8080;

const SERVER_MODO = args.modo || args._[1] || args._[0] || process.env.SERVER_MODO || 'fork';

if (SERVER_MODO === 'cluster') {

    if (cluster.isPrimary) {
        /// creamos a los hijos 
        console.log('Primary proccess: ' + process.pid);
        for (let i = 0; i < core.cpus().length; i++) {
            cluster.fork();
        }

        // regenera otro proceso si se cierra uno
        cluster.on('exit', (worker, code) => {
            cluster.fork();
        })
    } else {
        const serv = server.listen(PORT, () => {
            logger.info(`Escuchando puerto ${serv.address().port} en proceso ID:(${process.pid})`);
        })
        serv.on('error', err => logger.error(err));
    }

} else {

    const serv = server.listen(PORT, () => {
        logger.info(`Escuchando puerto ${serv.address().port} en proceso ID:(${process.pid})`);
    })
    serv.on('error', err => log.error('Escuchando puerto ', err));

}

