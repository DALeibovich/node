const { fakerProductosService } = require('../services/productos.service')


const fakerProductosController = (req, res) => {
    res.status(200).send(fakerProductosService(5));
}


const emitirProductosSocket = (io, socket) => {
    socket.emit('productos', fakerProductosService(5));
}



const HBSfakerProductosController = (req, res) => {
    let arr = fakerProductosService(3);
    res.render("productos", { arrObjetos: arr });
}

const PUGfakerProductosController = (req, res) => {
    let arr = fakerProductosService(4);
    res.render("layouts/index.pug", { arrObjetos: arr });
}


const EJSfakerProductosController = (req, res) => {
    let arr = fakerProductosService(5);
    res.render("layouts/index.ejs", { arrObjetos: arr });
}






module.exports = {
    emitirProductosSocket,
    fakerProductosController,
    HBSfakerProductosController,
    PUGfakerProductosController,
    EJSfakerProductosController
}