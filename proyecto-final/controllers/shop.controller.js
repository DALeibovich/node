
const {
    archivoCarritos,
    existeCarrito,
    agregarCarritosService,
    getCarritosService,
    actualizaCarritosService,
    borrarCarritosService,
    actualizarCantidadService
} = require('../services/carritos.service.js');

const { actualizarStockService, existeProducto, getProductosGeneroService, getProductosService } = require('../services/productos.service');
const { existeOrdenes, getOrdenesService, getOrdenesClienteService, agregarOrdenesService, containerOrdenes } = require('../services/ordenes.service');
const { Carrito } = require('../models/Carrito');
const { Orden } = require('../models/Ordenes');
const { enviarEmail } = require('../utils/mailer');
const { enviarSMS } = require('../utils/sms');
const { enviarWhatsapp } = require('../utils/whatsapp');
const { EmailingDTO } = require('../dtos/mailing.dto');
require('dotenv/config');
const { logger } = require('../middlewares/logs');
//const response = require('koa/lib/response');

const sumarTotal = (arrProductos) => {
    let total = 0;
    for (let i = 0; i < arrProductos.length; i++) {
        total += (parseFloat(arrProductos[i].precioTotal));
        //(Math.round(num * 100) / 100).toFixed(2)
    }
    return total.toFixed(2);
}

const SHOPlistarProductosCarritosController = async (req, res) => {

    const { avatar, username } = req.user;
    if (!req.session.idcarrito || !req.session.idcarrito === null || req.session.idcarrito === undefined) {

        agregarCarritos(req, res, req.session.id)
            .then((response) => {

                //req.session.idcarrito = response;
                getCarritosService(req.session.idcarrito)
                    .then((rows) => {
                        res.render('pages/carrito', { avatar, username, arrObjetosCarrito: rows[0].productos, total: sumarTotal(rows), direccion: req.user.direccion, logueado: true })
                    })
                    .catch(err => logger(err));

            })
    } else {

        getCarritosService(req.session.idcarrito)
            .then((rows) => {
                res.render('pages/carrito', { avatar, username, arrObjetosCarrito: rows[0].productos, total: sumarTotal(rows[0].productos), direccion: req.user.direccion, logueado: true })
            })
            .catch(err => console.log(err));
    }

}

const agregarCarritos = async (req, res, idsession = "-") => {
    let ultimo = await archivoCarritos.ultimoId() ?? 1;
    let carrito = new Carrito(ultimo + 1);
    agregarCarritosService({ id: carrito.id, idHash: carrito.idHash, timestamp: carrito.timestamp, idsession: idsession, productos: carrito.productos })
        .then(response => {

            req.session.idcarrito = response;
            return response;
        })
}



const hayStock = (req, res, stock) => {

    if (stock <= 0) {
        const { avatar, username, nombre } = req.user;
        let mensaje = "No hay stock para este producto";
        res.render('pages/errors', { nombre, avatar, username, error: true, message: mensaje, logueado: true })


    }
}

const agregarProductosCarritos = async (req, res) => {
    const { avatar, username, nombre } = req.user;
    let idcarrito = req.session.idcarrito;
    let idproducto = req.params.id;
    let carrito = await getCarritosService(idcarrito);
    let producto = await getProductosService(idproducto);
    //let existeProductoCarrito = carrito[0].productos.findIndex(producto => producto._id==idproducto);
    if (producto[0].stock !== 0) {
        // if(existeProductoCarrito === -1){
        let objetoNuevo = Object.assign({ cantidad: 1, precioTotal: parseFloat(producto[0].precio), dedicatoria: "", regalo: "NO" }, producto[0]);
        //productos.push(objetoNuevo);

        carrito[0].productos.push(objetoNuevo);
        actualizaCarritosService(carrito[0], idcarrito)
            .then(rows => {
                res.redirect('/carrito');
            })
        //}else{
        //    let mensaje = "Por razones comerciales, solo se permite un libro de ";
        //    res.status(404).render('pages/errors', { nombre, avatar, username, error: true, message: mensaje, logueado: true }) 
        //}
    } else {
        let mensaje = "No hay stock para este producto";
        res.status(404).render('pages/errors', { nombre, avatar, username, error: true, message: mensaje, logueado: true })
    }
}

const SHOPagregarProductosCarritosController = async (req, res) => {

    if (!req.session.idcarrito) {
        //agregarCarritosService(req.session.id)
        agregarCarritos(req, res, req.session.id)
            .then(response => {
                console.log(response)
                //req.session.idcarrito = response;
                //res.redirect('/carrito/add/' + req.params.id);
                //console.log("ESTE TAMPOCO" + response)
                return agregarProductosCarritos(req, res);
            })

        //console.log("ESTE NO ANDA")
    } else {
        //console.log("ESTE ANDA")
        agregarProductosCarritos(req, res);
    }



}
/*
async function agregarProducto(idcar, idp) {
    let ret = [{ estado: 'No se pudo guardar' }];
    try {

        let producto = await archivoLibros.getById(idp)
        let carrito = await archivoCarritos.getById(idcar)

        carrito[0].productos.push(producto[0])
        await archivoCarritos.actualizaArchivo(carrito[0], idcar)
            .then(response => {
                ret = response;
            });

    } catch (err) {
        console.log(err);

    }
    return ret;
}

*/
const SHOPborrarProductosCarritosController = async (req, res) => {
    let idcarrito = req.session.idcarrito;
    let idproducto = req.params.id;
    let productos = [];
    let carrito = await getCarritosService(idcarrito)
    productos = carrito[0].productos;
    let restoProductos = productos.filter(prod => prod._id != idproducto);
    carrito[0].productos = restoProductos;
    actualizaCarritosService(carrito[0], idcarrito)
        .then(rows => {
            res.redirect('/carrito');
        })
}


const agregarOrdenes = async (productos, usuario, carrito, info) => {
    let ultimo = await containerOrdenes.ultimoId() ?? 1;
    //let productos = await getProductosCarritosService(req.session.idcarrito);
    let orden = new Orden(ultimo + 1, Date.now(), productos, usuario, carrito, info, sumarTotal(productos));
    // constructor(id, idHash=makeRandomId(20), timestamp= Date.now(), productos = [], cliente='-', carrito = '-', estado='generada')
    //  agregarOrdenesService({ id: orden.id, idHash: orden.idHash, timestamp: orden.timestamp, idsession: idsession, productos: orden.productos })
    agregarOrdenesService(orden)
        .then(response => {
            console.log(response)
            return response;
        })
}

const SHOPactualizaCantidadProductoCarritosController = async (req, res) => {
    let productos = [];
    await getCarritosService((req.session.idcarrito))
        .then(rows => {
            let productosTemp = rows[0].productos;
            productosTemp.forEach(objeto => {
                objeto.cantidad = parseInt(req.body[`cantidad_${objeto._id}`]); // Object.assign({ cantidad: req.body[`cantidad_${objeto._id}`]}, objeto);
                objeto.precioTotal = (objeto.precio * objeto.cantidad).toFixed(2);
                objeto.regalo = req.body[`regalo_${objeto._id}`];
                objeto.dedicatoria = req.body[`dedicatoria_${objeto._id}`]
                productos.push(objeto);

            });
            actualizarCantidadService(req.session.idcarrito, productos)
        });
    res.redirect('/carrito');

    /*  for (let i = 0; i < productos.length; i++) {
          //console.log(productos[i]);
          await actualizarStockService(productos[i]._id, productos[i].stock - productos[i].cantidad)
      }*/
}

const finalizarCarrito = async (req, res) => {
    // enviar mail al admin
    let productos = [];
    let cuerpo_mail = '';
    let ret;
    await getCarritosService((req.session.idcarrito))
        .then(rows => {
            let productosTemp = rows[0].productos;
            productosTemp.forEach(objeto => {
                //let objetoNuevo = Object.assign({ cantidad: req.body[`cantidad_${objeto._id}`]}, objeto);
                //productos.push(objetoNuevo);
                objeto.cantidad = parseInt(req.body[`cantidad_${objeto._id}`]);
                objeto.precioTotal = (objeto.precio * objeto.cantidad).toFixed(2);
                objeto.regalo = req.body[`regalo_${objeto._id}`];
                objeto.dedicatoria = req.body[`dedicatoria_${objeto._id}`]
                productos.push(objeto);

            });
            let objUser = { id: req.user.id, nombre: req.user.nombre, email: req.user.email, telefono: req.user.telefono };
            objInfo = { Pago: req.body.formadepago, Envio: req.body.direccion_envio };
            let idOrden = agregarOrdenes(productos, objUser, req.session.idcarrito, objInfo);



            const emailing = new EmailingDTO();
            const cuerpo_mail = emailing.FinalizarCompra(idOrden, productos);

            // enviar email al admin
            if (process.env.ENVIAR_MAIL == 'SI') {
                enviarEmail(process.env.ADMINISTRADOR_EMAIL, `Nuevo pedido de ${req.user.nombre} - ${req.user.email} `, cuerpo_mail)
            }
            // enviar whatsapp al admin
            if (process.env.ENVIAR_WHATSAPP == 'SI') {
                enviarWhatsapp(process.env.ADMINISTRADOR_TEL, `Nuevo pedido de: `, ` ${req.user.nombre} - ${req.user.email} `)
            }
            // enviar SMS al comprador
            if (process.env.ENVIAR_SMS == 'SI') {
                enviarSMS(req.user.telefono, `Nuevo pedido`, `Su pedido ha sido recibido y se encuentra en proceso`)
            }
            //req.session.idcarrito = null;
            delete req.session.idcarrito;

        })

    for (let i = 0; i < productos.length; i++) {
        //console.log(productos[i]);
        await actualizarStockService(productos[i]._id, productos[i].stock - productos[i].cantidad)
    }
    //req.session.idcarrito = null;
    delete req.session.idcarrito;


    return productos;

}

const SHOPfinalizarCarritosController = async (req, res) => {
    const { nombre, avatar, username } = req.user;
    // listarProductosCarrito((req.session.idcarrito))
    if (req.session.idcarrito) {
        finalizarCarrito(req, res)
            .then((rows) => {
                res.render('pages/finalizar', { nombre, avatar, username, arrObjetosCarrito: rows, total: sumarTotal(rows), direccion_envio: req.body.direccion_envio, logueado: true })
            })
            .catch(err => console.log(err));
    } else {
        let mensaje = "No existe carrito";
        res.render('pages/errors', { nombre, avatar, username, error: true, message: mensaje, logueado: true })

    }
}





const SHOPlistarPedidosController = async (req, res) => {
    let id = req.params.id;
    const { nombre, avatar, username } = req.user;
    if (req.params.id === undefined) {
        getOrdenesClienteService(req.user.id)
            .then((rows) => {
                res.render('pages/pedidos', { nombre, avatar, username, arrObjetosCarrito: rows, logueado: true })
            })
    } else {
        getOrdenesService(id)
            .then((rows) => {
                res.render('pages/pedidos_detalle', { nombre, avatar, username, arrObjetosCarrito: rows, productos: rows[0].productos, logueado: true })
            })

    }


}

const SHOPexisteProductoController = async (req, res, next) => {

    let id = req.params.id || req.body.id || req.query.id;
    let existe = await existeProducto(id);
    //console.log("id" + id);
    if (existe.length > 0) {

        next();
    } else {
        const { nombre, avatar, username } = req.user;
        let mensaje = "No existe producto";
        res.render('pages/errors', { nombre, avatar, username, error: true, message: mensaje, logueado: true })

    }
}



const SHOPexisteOrdenesController = async (req, res, next) => {

    let id = req.params.id || req.body.id || req.query.id;
    let existe = await existeOrdenes(id);
    if (existe.length > 0) {
        next();
    } else {
        const { nombre, avatar, username } = req.user;
        let mensaje = "No existe orden";
        res.render('pages/errors', { nombre, avatar, username, error: true, message: mensaje, logueado: true })

    }
}


const SHOPlistarProductosController = async (req, res) => {
    let id;
    if (req.params.id !== undefined) id = req.params.id;

    if (!req.session.idcarrito || !req.session.idcarrito === null || req.session.idcarrito === undefined) await agregarCarritos(req, res, req.session.id)

    getProductosService(id)
        .then(rows => {
            //console.log(rows);
            if (id === undefined) {
                res.render('pages/dashboard', { username: req.user.username, arrObjetos: rows, avatar: req.user.avatar, genero: req.body.genero, logueado: true });
            } else {
                res.render('pages/producto_detalle', { username: req.user.username, arrObjetos: rows, avatar: req.user.avatar, genero: req.body.genero, logueado: true });
            }
        })


}

const SHOPlistarProductosGeneroController = async (req, res) => {
    await getProductosGeneroService(req.params.genero)
        .then((rows) => {
            let generoNuevo = req.params.genero[0].toUpperCase() + req.params.genero.substring(1);
            res.render('pages/dashboard', { username: req.user.username, arrObjetos: rows, avatar: req.user.avatar, genero: generoNuevo, logueado: true });
        })

}

module.exports = {
    SHOPlistarProductosCarritosController,
    SHOPagregarProductosCarritosController,
    SHOPborrarProductosCarritosController,
    SHOPfinalizarCarritosController,
    SHOPlistarPedidosController,
    SHOPlistarProductosController,
    SHOPlistarProductosGeneroController,
    SHOPexisteProductoController,
    SHOPexisteOrdenesController,
    SHOPactualizaCantidadProductoCarritosController
}

