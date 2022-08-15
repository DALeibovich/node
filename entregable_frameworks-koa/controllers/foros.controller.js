const { archivoForos, agregarMensajesService, getMensajesService } = require('../services/foros.service');
const { ForoDTO } = require('../dtos/foros.dto');



/****** CONTENDOR DE ARCHIVO ************/


const { logger } = require('../middlewares/logs')

const util = require("util");
function print(obj) {
    console.log(util.inspect(obj, false, 12, true));
}
//******** NORMALIZAMOS *****************/
const { schema, normalize, denormalize } = require("normalizr");
const { Console } = require('console');
const autorSchema = new schema.Entity('autores');

const mensajesEntity = new schema.Entity('mensajes', {
    author: autorSchema
}, { idAttribute: 'id' });

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
getMensajesService()
    .then(res => logger.info(res))
    .catch(err => logger.error(err))

// funciones para emitir por socket
const emitirMensajesSocket2 = (io, socket) => {
    //console.log(archivoForos.arrObjetos)
    getMensajesService()
        .then(response => {
            console.log("++++" + response)
            if (!response) response = [];
            console.log(archivoForos.arrObjetos)
            let resultsDTO = archivoForos.arrObjetos.map((mensaje) => new ForoDTO(mensaje));
            socket.emit('mensajes', normalizaMensajes(resultsDTO));
            //socket.emit('mensajes', normalizaMensajes(archivoForos.arrObjetos));
        })

}

const emitirMensajesSocket = async (io, socket) => {
    //console.log(archivoForos.arrObjetos)
    let ret = await getMensajesService()
    let resultsDTO = archivoForos.arrObjetos.map((mensaje) => new ForoDTO(mensaje));
    socket.emit('mensajes', normalizaMensajes(resultsDTO));
    //socket.emit('mensajes', normalizaMensajes(ret));


}
/*
const getUsers = async (req, res) => {
    let result = await usersService.getUsers();
    let resultsDTO = result.map((user) => new UsersDTO(user));
    res.send(resultsDTO);
  };
*/

const getMensajesController = async (req, res) => {
    getMensajesService()
        .then(response => {
            console.log("++++" + response)
            if (!response) response = [];
            console.log(archivoForos.arrObjetos)
            let resultsDTO = archivoForos.arrObjetos.map((mensaje) => new ForoDTO(mensaje));
            res.json(normalizaMensajes(resultsDTO));

        })

}

const agregaMensajesController = async (req, res) => {
    agregarMensajesService(data)
        .then(rows => {
            console.log("++++" + rows)
            if (rows === null) rows = [];

            res.json(normalizaMensajes(resultsDTO));
        });
}
const agregarMensajeSocket = async (io, socket) => {
    socket.on('agregarMensaje', function (data) {

        agregarMensajesService(data)
            .then(rows => {
                getMensajesService()
                    .then(rows => {
                        let resultsDTO = archivoForos.arrObjetos.map((mensaje) => new ForoDTO(mensaje));
                        io.sockets.emit('mensajes', normalizaMensajes(resultsDTO));
                        io.sockets.emit('agregadoPorMsg', data);
                    })
            })

    });

}




module.exports = {
    archivoForos,
    emitirMensajesSocket,
    agregarMensajeSocket,
    getMensajesController,
    agregaMensajesController
};
