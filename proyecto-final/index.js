require('dotenv').config();
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
const productos = require('./routes/productos');
const carritos = require('./routes/carritos');
const controlAccesoApi = require('./middlewares/controlAccesoApi');


// servidor escuchando sobre el puerto 8080
/*const server = app.listen(PORT, (err) => {
    if (err) {
        console.error(err);
    } else {
        console.log(`Escuchando puerto: ${server.address().port}`);
    }
})*/

/**********CONFIGURACION DEL ENTORNO ************************************************ */
// para capturar tipos de datos y no solo string
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// para que tome la carpeta publica or defecto y el index.html contenido
app.use(express.static(path.join(__dirname, 'public')));

app.use(cookieParser());
const connection = mongoose.connect(process.env.MONGO_DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});


/******** PLANTILLAS     *****************************************/
// conservo del entregable anterior
const handlebars = require('express-handlebars');
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
const login = require('./routes/login');
app.use('/', login);

const usuarioRoutes = require('./routes/usuarios');
app.use('/', usuarioRoutes);

const shopRoutes = require('./routes/shop');
app.use('/', shopRoutes);


// ruteo para los productos
app.use('/api/', controlAccesoApi);
app.use('/api/productos', productos);
app.use('/api/carrito', carritos);



// por default si no encuentra una ruta especifica
app.use((req, res) => {
    res.send({error: "-1", descripcion: `endPoint en ruta ${req.baseUrl + req.url} no disponible`})
})


/******** SERVER WEB *****************************************************************/
let args = parseArgs(process.argv.slice(2))
//const PORT = process.env.PORT || 8080;

//const PORT = args.port || 8080;
const PORT = args.port || args._[0] || process.env.PORT || 8080;

const SERVER_MODO = args.modo || args._[1] || args._[0] || process.env.SERVER_MODO || 'fork';

if (SERVER_MODO === 'cluster') {

    if (cluster.isPrimary) {
        /// creamos a los hijos 
        //console.log('Primary proccess: ' + process.pid);
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