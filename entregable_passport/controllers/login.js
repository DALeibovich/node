// funciones para emitir por socket
//const session = require('cookie-session')
const emitirLogin = (io, socket) => {
    const req = socket.request;
    // aca se podria controlar la session cuando vien por websocket
    socket.emit('login');
    
}

module.exports = {emitirLogin};