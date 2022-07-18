/****** CONEXION BASE DE DATO SQLite3 ************/
//const { db_sqlite } = require('./conexionDB');
//let archivoForos = db_sqlite;


/****** CONTENDOR DE ARCHIVO ************/
const fs = require('fs');
const Contenedor = require('../models/Contenedor');
const nombreArchivoForo = 'foro-normalizr.json';
let archivoForos = new Contenedor(nombreArchivoForo, fs);


const util = require("util");
function print(obj) {
    console.log(util.inspect(obj, false, 12, true));
}
//******** NORMALIZAMOS *****************/
const { schema, normalize, denormalize } = require("normalizr");
const autorSchema = new schema.Entity('autores');

const mensajesEntity = new schema.Entity('mensajes', {
    author: autorSchema
},{idAttribute: 'id'});

// funcion para normalizar
const normalizaMensajes = (mensajes) => {
    const normalizeData = normalize(mensajes, [mensajesEntity]);
    return normalizeData;
   
}

// funcion para desnormalizar
const desnormalizaMensajes = (mensajes) => {
    const desnormalizeData = denormalize(normalizeData.result, [mensajesEntity], normalizeData.entities);
    return desnormalizeData;
    
}

// obtenemos todos los productos del archivo
archivoForos.getAll()
    .then(res => console.log('Mensajes cargados con exito'))
    .catch(err => console.log(err))

// funciones para emitir por socket
const emitirMensajesSocket = (io, socket) => {
    //console.log(archivoForos.arrObjetos)
    socket.emit('mensajes', normalizaMensajes(archivoForos.arrObjetos));
}

const agregarMensajeSocket = (io, socket) => {
    socket.on('agregarMensaje', function (data) {
        archivoForos.save(data);
        // emite a todos los que escuchando el socket
        io.sockets.emit('mensajes', normalizaMensajes(archivoForos.arrObjetos));
        io.sockets.emit('agregadoPorMsg', data);
    });
}


module.exports = {
    archivoForos,
    emitirMensajesSocket,
    agregarMensajeSocket
};
