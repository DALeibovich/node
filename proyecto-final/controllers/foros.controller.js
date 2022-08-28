const { archivoForos, agregarMensajesService, getMensajesService } = require('../services/foros.service');
const { ForoDTO, ForoClientesDTO, ForoBienvenidaDTO } = require('../dtos/foros.dto');



/****** CONTENDOR DE ARCHIVO ************/


const { logger } = require('../middlewares/logs')

const util = require("util");
/*function print(obj) {
    console.log(util.inspect(obj, false, 12, true));
}*/
//******** NORMALIZAMOS *****************/
const { schema, normalize, denormalize } = require("normalizr");
//const { Console } = require('console');
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
/*getMensajesService()
    .then(res => logger.info(res))
    .catch(err => logger.error(err))
*/
// funciones para emitir por socket
const emitirMensajesSocket2 = (io, socket) => {
    //console.log(archivoForos.arrObjetos)
    getMensajesService()
        .then(response => {
            //console.log("++++" + response)
            if (!response) response = [];
            //console.log(archivoForos.arrObjetos)
            let resultsDTO = archivoForos.arrObjetos.map((mensaje) => new ForoDTO(mensaje));
            socket.emit('mensajes', normalizaMensajes(resultsDTO));
            //socket.emit('mensajes', normalizaMensajes(archivoForos.arrObjetos));
        })

}

const emitirMensajesSocket = async (io, socket, userIde) => {
    //console.log(archivoForos.arrObjetos)
    const userId = socket.id;
    
    socket.join(userId);
    let ret = await getMensajesService(userIde);
    let resultsDTO;
    if(ret.length > 0){
         resultsDTO = await ret.map((mensaje) => new ForoDTO(mensaje));
    }else{
         resultsDTO = new ForoBienvenidaDTO();
    }
    
    io.to(userId).emit('mensajes', normalizaMensajes(resultsDTO));
    io.sockets.emit('mensajes_' + userIde, normalizaMensajes(resultsDTO));
    //socket.emit('mensajes', normalizaMensajes(ret));
    

    let retcliente = await getMensajesService();
    let resultsDTOcliente = await retcliente.map((mensaje) => new ForoClientesDTO(mensaje));
    

    const ids = resultsDTOcliente.map(o => o.email)
    const clientes = resultsDTOcliente.filter(({email}, index) => !ids.includes(email, index + 1))
    const filtroClientes = clientes.filter(c => c.email !== 'admin@adminadmin') 
    io.sockets.emit('clientes', (filtroClientes));
   // io.sockets.emit('clientes', normalizaMensajes(resultsDTO));

}

const emitirMensajesSocketAdmin = async (io, socket, userIde) => {
    //console.log(archivoForos.arrObjetos)
   
    let ret = await getMensajesService(userIde);
    let resultsDTO = await ret.map((mensaje) => new ForoDTO(mensaje));

    const userId = resultsDTO.q;

    socket.join(userId);
    socket.emit('mensajes', normalizaMensajes(resultsDTO));
    //socket.emit('mensajes', normalizaMensajes(ret));
    emitirListaClientes(io, socket, ret)

    //io.to(userId).emit('agregadoPorMsg', data);

}

const emitirListaClientes = async (io, socket, ret) => {

    let resultsDTOcliente = ret.map((mensaje) => new ForoClientesDTO(mensaje));   
  //  const ids = resultsDTOcliente.map(o => o.email)
   // const filtered = resultsDTOcliente.filter(({email}, index) => !ids.includes(email, index + 1)) || []
    //socket.emit('clientes', (filtered));



    const ids = resultsDTOcliente.map(o => o.email)
    const clientes = resultsDTOcliente.filter(({email}, index) => !ids.includes(email, index + 1))
    const filtroClientes = clientes.filter(c => c.email !== 'admin@adminadmin') 
    io.sockets.emit('clientes', (filtroClientes));
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
            //console.log("++++" + response)
            if (!response) response = [];
            //console.log(archivoForos.arrObjetos)
            let resultsDTO =  archivoForos.arrObjetos.map((mensaje) => new ForoDTO(mensaje));
            res.json(normalizaMensajes(resultsDTO));

        })

}

const agregaMensajesController = async (req, res) => {
    agregarMensajesService(data)
        .then(rows => {
            //console.log("++++" + rows)
            if (rows === null) rows = [];

            res.json(normalizaMensajes(resultsDTO));
        });
}
const agregarMensajeSocket = async (io, socket) => {
    socket.on('agregarMensaje', function (data) {
        const userIde = data.q;
        if(data.text != ""){
       

        //socket.join(userId);
        agregarMensajesService(data)
            .then(rows => {
                getMensajesService(userIde)
                    .then(rows2 => {
                        //let resultsDTO = rows2.map((mensaje) => new ForoDTO(mensaje));
                      //  socket.emit('mensajes', normalizaMensajes(resultsDTO));
                        //socket.join(userId);
                       // io.to(userId).emit('agregadoPorMsg', data);
                       emitirMensajesSocket(io, socket, userIde);
                       emitirListaClientes(io, socket, rows2);
                       //emitirMensajesSocketAdmin(io, socket, userIde);
                    })
                  
            })
        }else{

            emitirMensajesSocket(io, socket, userIde);
            //emitirListaClientes(io, socket, []);
            //emitirMensajesSocketAdmin(io, socket, userIde);

        }
    });

}

const iniciarChatController = async(req, res) => {
    const { nombre, email, direccion, telefono, username, avatar, edad } = req.user;
    res.render('pages/chats', {nombre, email, direccion, telefono, username, avatar, edad, logueado: true })

}


module.exports = {
    archivoForos,
    emitirMensajesSocket,
    agregarMensajeSocket,
    getMensajesController,
    agregaMensajesController,
    emitirMensajesSocketAdmin,
    iniciarChatController
};
