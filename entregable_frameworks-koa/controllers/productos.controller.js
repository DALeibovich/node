const { fakerProductosService, agregarProductosService, getProductosService, actualizaProductoService, borrarProductoService  } = require('../services/productos.service')


const fakerProductosController = (req, res) => {
    res.status(200).send(fakerProductosService(5));
}


const emitirProductosSocket = (io, socket) => {
    
   //socket.emit('productos', fakerProductosService(5));
   getProductosService()
   .then(response =>{
    socket.emit('productos', response);
   })
    //socket.emit('productos', getProductosService());
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

const agregarProductosController = (req, res) => {
    
    agregarProductosService(req.body)
            .then(rows => {
                res.status(200).send(rows);
            })
}

const actualizarProductosController = (req, res) => {
    
    actualizaProductoService(req.body, req.params.id)
            .then(rows => {
                res.status(200).send(rows);
            })
}

const borrarProductosController = (req, res) => {
    
    borrarProductoService(req.params.id)
            .then(rows => {
                res.status(200).send(rows);
            })
}

const agregarProductoSocket = (io, socket) => {
    socket.on('agregarProducto', function (data) {
        //console.log(data);
        agregarProductosService(data)
            .then(rows => {
                // emite a todos los que escuchando el socket
                io.sockets.emit('productos', rows);
                io.sockets.emit('agregadoPor', data);
            })
        // archivoLibros.save(data);


    });
}

const getProductosController = async (req, res) => {
    
     getProductosService()
            .then(rows => {
                console.log(rows);
                res.status(200).send(rows);
            })

}

module.exports = {
    emitirProductosSocket,
    agregarProductoSocket,
    fakerProductosController,
    HBSfakerProductosController,
    PUGfakerProductosController,
    EJSfakerProductosController,
    agregarProductosController,
    actualizarProductosController,
    borrarProductosController,
    getProductosController
}