const { existeProducto, archivoLibros, agregarProductosService, getProductosService, actualizaProductoService, borrarProductoService } = require('../services/productos.service')
const Producto = require('../models/Productos');
const { existeOrdenes, getOrdenesService, getOrdenesClienteService, agregarOrdenesService, containerOrdenes } = require('../services/ordenes.service');
const { Orden } = require('../models/Ordenes');
require('dotenv/config');
const { ConfigDTO } = require('../dtos/config.dto');
const { logger } = require('../middlewares/logs');
const core = require('os');
const sumarTotal = (arrProductos) => {
    let total = 0;
    for (let i = 0; i < arrProductos.length; i++) {
        total += parseFloat(arrProductos[i].precio);
    }
    return total;
}

const ADMINlistarPedidosController = async (req, res) => {
    let id = req.params.id;
    const { nombre, avatar, username } = req.user;
    if (req.params.id === undefined) {
        getOrdenesClienteService()
            .then((rows) => {
                res.render('pages/admin/pedidos', { nombre, avatar, username, arrObjetosCarrito: rows, logueado: true, admin: true })
            })
    } else {
            getOrdenesService(id)
                .then((rows) => {
                    res.render('pages/admin/pedidos_detalle', { nombre, avatar, username, arrObjetosCarrito: rows, productos: rows[0].productos, logueado: true, admin: true })
                })
    }


}

const ADMINlistarProductosController = async (req, res) => {
    let id;
    if (req.params.id !== undefined) id = req.params.id;
        getProductosService(id)
            .then(rows => {
                if (id === undefined) {
                    res.render('pages/admin/productos', { username: req.user.username, arrObjetos: rows, avatar: req.user.avatar, genero: req.body.genero, logueado: true, admin: true });
                } else {
                    const { nombre, autor, foto, precio, stock, descripcion, genero } = rows[0];
                    res.render('pages/admin/productos', { id: req.params.id, nombre, autor, foto, precio, stock, descripcion, genero, username: req.user.username, avatar: req.user.avatar, arrObjetos: rows, logueado: true, admin: true })
                }
            })
}


const ADMINagregarProductosController = async (req, res) => {
    let ultimo = await archivoLibros.ultimoId() ?? 0;
    const { nombre, autor, foto, precio, descripcion, codigo, stock, genero } = req.body;
    let producto = new Producto(parseInt(ultimo) + 1, nombre, autor, foto, precio, descripcion, codigo, parseInt(stock), genero);
    agregarProductosService(producto)
        .then(rows => {
            res.redirect('/admin/productos');
        })
}


const ADMINborrarProductosController = async (req, res) => {
        borrarProductoService(req.params.id)
            .then(rows => {
                res.redirect('/admin/productos');
            })
}

const ADMINactualizarProductosController = async (req, res) => {
    const { nombre, autor, foto, precio, descripcion, codigo, stock, genero } = req.body;
    let producto = new Producto(0, nombre, autor, foto, precio, descripcion, codigo, parseInt(stock), genero);
   
        actualizaProductoService(producto, req.params.id)
            .then(rows => {
                res.redirect('/admin/productos');
            })
}


const ADMINexisteProductoController = async (req, res, next) => {    
    let id = req.params.id || req.body.id || req.query.id;
    let existe = await existeProducto(id);
    if (existe.length > 0) {    
        next();
    } else {
        const { nombre, avatar, username } = req.user;
        let mensaje = "No existe producto";
        res.render('pages/errors', { nombre, avatar, username, error: true, message: mensaje, logueado: true, admin:true })
    }
}



const ADMINexisteOrdenesController = async (req, res, next) => {    
    let id = req.params.id || req.body.id || req.query.id;
    let existe = await existeOrdenes(id);
    if (existe.length > 0) {    
        next();
    } else {
        const { nombre, avatar, username } = req.user;
        let mensaje = "No existe orden";
        res.render('pages/errors', { nombre, avatar, username, error: true, message: mensaje, logueado: true, admin:true })
    }
}



const ADMINvisualizarConfigController = async (req, res) => {
    const env = new ConfigDTO(process.env);
    const { email, direccion, telefono, username, avatar, edad } = req.user;
    res.render('pages/admin/infoServer', { process, cpu: core.cpus().length, email, direccion, telefono, username, avatar, edad, logueado: true, admin: true, env: JSON.stringify(env, null, 2) });
}


const ADMINchatsController = async (req, res) => {
    const { nombre, email, direccion, telefono, username, avatar, edad } = req.user;
    if (req.params.destino === undefined) {        
        res.render('pages/admin/chats', { nombre, email, direccion, telefono, username, avatar, edad, logueado: true, admin: true })
    } else {
        res.render('pages/admin/chats_mensajes', { nombre, email, direccion, telefono, username, avatar, edad, logueado: true, admin: true, username_destino: req.params.destino, chat: true })
    }

}

module.exports = {
    ADMINlistarPedidosController,
    ADMINlistarProductosController,
    ADMINagregarProductosController,
    ADMINborrarProductosController,
    ADMINactualizarProductosController,
    ADMINvisualizarConfigController,
    ADMINchatsController,
    ADMINexisteProductoController,
    ADMINexisteOrdenesController

}