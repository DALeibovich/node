const {
    archivoCarritos,
    existeCarrito,
    agregarCarritosService,
    getCarritosService,
    actualizaCarritosService,
    borrarCarritosService
} = require('../services/carritos.Service.js');

const {  existeProducto,  getProductosService } = require('../services/productos.service');
const { Carrito } = require('../models/Carrito');

const existeCarritoController = async(req, res, next) => {
    let id = req.params.id || undefined;
    let existe = await existeCarrito(id);
    if(existe.length === 0){
         res.status(404).send({message: 'No existe carrito'});
    }else{
    next();
    }
}


const existeProductoController = async(req, res, next) => {
    let id = req.body.id || undefined;
    let existe = await existeProducto(id);
    if(existe.length === 0){
         res.status(404).send({message: 'No existe producto'});
    }else{
    next();
    }
}

const agregarCarritosController = async (req, res, idsession = '-') => {
    let ultimo = await archivoCarritos.ultimoId() ?? 1;
    let carrito = new Carrito(ultimo + 1);
    agregarCarritosService({ id: carrito.id, idHash: carrito.idHash, timestamp: carrito.timestamp, idsession: idsession, productos: carrito.productos })
        .then(rows => {
            res.status(200).send(rows);
        })
}


const actualizarCarritosController = (req, res) => {
    actualizaCarritosService(req.body, req.params.id)
        .then(rows => {
            res.status(200).send(rows);
        })
}


const borrarCarritosController = (req, res) => {
    borrarCarritosService(req.params.id)
        .then(rows => {
            res.status(200).send(rows);
        })
}


const listarCarritosController = async (req, res) => {
    let id;
    if (req.params.id !== undefined) id = req.params.id;
    getCarritosService(id)
        .then(rows => {
            console.log(rows);
            res.status(200).send(rows);
        })
}



const listarProductosCarritosController = async (req, res) => {
    let id;
    if (req.params.id !== undefined) id = req.params.id;
    getCarritosService(id)
        .then(rows => {
            console.log(rows);
            res.status(200).send(rows[0].productos);
        })
}

const agregarProductosCarritosController = async (req, res) => {
    let idcarrito = req.params.id;
    let idproducto = req.body.id;
    let producto = await getProductosService(idproducto);
    let carrito = await getCarritosService(idcarrito);
    carrito[0].productos.push(producto[0]);
    actualizaCarritosService(carrito[0], idcarrito)
        .then(rows => {
            res.status(200).send(rows.productos);
        })
}


const borrarProductosCarritosController = async (req, res) => {
    let idcarrito = req.params.id;
    let idproducto = req.body.id;
    let productos = [];
    let carrito = await getCarritosService(idcarrito)
    productos = carrito[0].productos;
    let restoProductos = productos.filter(prod => prod._id != idproducto);
    carrito[0].productos = restoProductos;
    actualizaCarritosService(carrito[0], idcarrito)
        .then(rows => {
            res.status(200).send(rows.productos);
        })
}

module.exports = {
    agregarCarritosController,
    actualizarCarritosController,
    borrarCarritosController,
    listarCarritosController,
    listarProductosCarritosController,
    agregarProductosCarritosController,
    borrarProductosCarritosController,
    existeCarritoController,
    existeProductoController
}