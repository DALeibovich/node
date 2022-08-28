require('dotenv').config();
const {persistencia} = require('./config/config');
const parseArgs = require('minimist');
const express = require('express');
const cluster = require('cluster');
const core = require('os');
const session = require('express-session');
const cookieParser = require("cookie-parser");
const passport = require('passport');
const mongoose = require('mongoose');
const storeMongo = require("connect-mongo");
const app = express();
const server = require('http').Server(app);
const path = require('path');
const productosApi = require('./routes/productos.api.routes');
const ordenesApi = require('./routes/ordenes.api.routes');
const carritos = require('./routes/carritos.api.routes');

const controlAccesoApi = require('./middlewares/controlAccesoApi');

/**********CONFIGURACION DEL ENTORNO ************************************************ */
// para capturar tipos de datos y no solo string
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// para que tome la carpeta publica or defecto y el index.html contenido
app.use(express.static(path.join(__dirname, 'public')));

app.use(cookieParser());
const connection = mongoose.connect(persistencia(), {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

/******** PLANTILLAS     *****************************************/
// conservo del entregable anterior
const handlebars = require('express-handlebars');
const hbs = require('handlebars');
hbs.registerHelper('dateFormat', require('helper-date'));

hbs.registerHelper('esDistinto', function(arg1, arg2, options) {
    return (arg1 != arg2) ? options.fn(this) : options.inverse(this);
});
hbs.registerHelper('esIgual', function(arg1, arg2, options) {
    return (arg1 == arg2) ? options.fn(this) : options.inverse(this);
});

hbs.registerHelper('for', function(n, block) {
    var accum = '';
    for(var i = 1; i <= n; ++i)
        accum += block.fn(i);
    return accum;
});

const { engine } = handlebars;

app.engine(
    "hbs",
    engine({
        extname: ".hbs",
        defaultLayout: "index",
    })
    
);
app.set("views", "./views"); //especifica el directorio
app.set("view engine", "hbs");

/******SESSIONES */

let baseSession = session({
    store: storeMongo.create({
        mongoUrl: persistencia(), //process.env.MONGO_DB,
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
const { initializePassport } = require('./controllers/strategy-validation/localPassport');
initializePassport()
app.use(passport.initialize())
app.use(passport.session())

//************ MIDDLEWARES *********  */

// middlewares de autorizacion
const controlLogin = require('./middlewares/controlLoginPassportLocal');
app.use('/', controlLogin)

// middlewares de compresion 
const compresion = require('./middlewares/compresion');
app.use('/', compresion)

// middlewares de logs
const { routerLogger, logger } = require('./middlewares/logs');
app.use(routerLogger)

// middlewares ruteo de login
const login = require('./routes/login.routes');
app.use('/', login);

const perfilRoutes = require('./routes/perfil.routes');
app.use('/', perfilRoutes);

const adminRoutes = require('./routes/admin.routes');
app.use('/', adminRoutes);

//const shopRoutes = require('./routes/shop');
const shopRoutes = require('./routes/shop.routes');
app.use('/', shopRoutes);

const chatRoutes = require('./routes/chat.routes');
app.use('/', chatRoutes);

// ruteo para las APIs
app.use('/api/', controlAccesoApi);
app.use('/api/productos', productosApi);
app.use('/api/carrito', carritos);
app.use('/api/ordenes', ordenesApi);
const usuariosApi = require('./routes/usuarios.api.routes');
app.use('/api/usuarios', usuariosApi);

// por default si no encuentra una ruta especifica
app.use((req, res) => {
    res.send({error: "-1", descripcion: `endPoint en ruta ${req.baseUrl + req.url} no disponible`})
})

/******** SERVER WEB *****************************************************************/
let args = parseArgs(process.argv.slice(2))
const PORT = args.port || args._[0] || process.env.PORT || 8080;
const SERVER_MODO = args.modo || args._[1] || args._[0] || process.env.SERVER_MODO || 'fork';

if (SERVER_MODO === 'cluster') {

    if (cluster.isPrimary) {
        /// creamos a los hijos 
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

/******** SERVER WEBSOCKET *************************************************/
const { emitirMensajesSocketAdmin, emitirMensajesSocket, agregarMensajeSocket } = require('./controllers/foros.controller');

//const server = require('http').Server(app);
const io = require('socket.io')(server);
// escuchamos la conexion del socket
io.on('connection', function (socket) {
    try {
        agregarMensajeSocket(io, socket, app);
    } catch (err) {
        logger.error(`Mensajes error ${Date()} ${err.code} ${err.message}`)
    }

});