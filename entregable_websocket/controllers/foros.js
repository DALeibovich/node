// creamos el contenedor de archivo
const fs = require('fs');
const { isObject } = require('util');
// incluimos el contenedor de archivo con su modelo de datos
const Contenedor = require('../models/Contenedor');
const nombreArchivoForo = 'foros.txt'; 
let archivoForos = new Contenedor(nombreArchivoForo, fs);
// obtenemos todos los productos del archivo
archivoForos.getAll()
    .then(res => console.log('Mensajes cargados con exito'))
    .catch(err => console.log(err));
// funciones para emitir por socket
const emitirMensajesSocket = (io, socket) => {

    socket.emit('mensajes', archivoForos.arrObjetos);
}

const agregarMensajeSocket = (io, socket) => {
    socket.on('agregarMensaje', function (data) {
        console.log(data);
        archivoForos.save(data);
        // emite al mismo que lo agrego    
        //socket.emit('productos', archivoLibros.arrObjetos);
        //socket.emit('agregadoPor', data);

        // emite a todos los que escuchando el socket
        io.sockets.emit('mensajes', archivoForos.arrObjetos);
        io.sockets.emit('agregadoPorMsg', data);
    });
}




module.exports = {
    archivoForos,
    emitirMensajesSocket,
    agregarMensajeSocket
};
