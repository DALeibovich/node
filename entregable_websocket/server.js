const express = require('express');
const app = express();
const path = require('path');
const { emitirProductosSocket, agregarProductoSocket } = require('./controllers/productos');
const { emitirMensajesSocket, agregarMensajeSocket } = require('./controllers/foros');


/**********CONFIGURACION DEL ENTORNO ************************************************ */
// para capturar tipos de datos y no solo string
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// para que tome la carpeta publica or defecto y el index.html contenido
app.use(express.static(path.join(__dirname, 'public')));


/******** SERVER WEBSOCKET *************************************************/
const server = require('http').Server(app);
const io = require('socket.io')(server);
// escuchamos la conexion del socket
io.on('connection', function (socket) {
    //emitimos los productos a los clientes
    emitirProductosSocket(io, socket);
    //Agregamos un producto enviado por el cliente
    agregarProductoSocket(io, socket);

    //emitimos los mensajes del foro
    emitirMensajesSocket(io, socket);
    //Agregamos un mensaje al foro
    agregarMensajeSocket(io, socket);

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
        defaultLayout: "index.hbs",
    })
);

app.set("views", "./views"); //especifica el directorio
app.set("view engine", "hbs");

// ruteo para los productos
app.use('/', productos);

// por default si no encuetra una ruta especifica
app.use((req, res) => {
    res.send('endPoint no encontrado')
});
