// obtenemos el controlador de productos con sus funciones
const { listarCarritos, borrarCarritos, finalizarCarrito, eliminarProductosCarrito, listarProductosCarrito, sumarTotal, archivoCarritos, nuevoCarrito, agregarProducto } = require('../controllers/carritos');
//const { listarCarritos, borrarCarritos} = require('../controllers/carritos2');

// creamos el ruteo de la api 
const express = require('express');
const { Router } = express;
const router = Router();



router.get("/carrito", (req, res) => {
    const { nombre, avatar, username } = req.user;
    if (!req.session.idcarrito) {
        nuevoCarrito(req.session.id)
            .then((response) => {
                req.session.idcarrito = response;

                listarProductosCarrito((response))
                    .then((rows) => {

                        res.render('pages/carrito', { nombre, avatar, username, arrObjetosCarrito: rows, total: sumarTotal(rows), direccion: req.user.direccion ,logueado: true })
                    })
                    .catch(err => console.log(err));

            })
    } else {

        listarProductosCarrito((req.session.idcarrito))
            .then((rows) => {

                res.render('pages/carrito', { nombre, avatar, username, arrObjetosCarrito: rows, total: sumarTotal(rows), direccion: req.user.direccion, logueado: true })
            })
            .catch(err => console.log(err));
    }


});

router.get("/carrito/add/:id", (req, res) => {

    if (!req.session.idcarrito) {
        nuevoCarrito(req.session.id)
            .then((response) => {
                req.session.idcarrito = response;
                agregarProducto((req.session.idcarrito), (req.params.id))
                    .then((response) => {
                        res.redirect('/carrito');
                    })
            })


    }else{
        agregarProducto((req.session.idcarrito), (req.params.id))
                    .then((response) => {
                        res.redirect('/carrito');
                    })
    }

})


router.get("/carrito/q/:id", (req, res) => {
    eliminarProductosCarrito((req.session.idcarrito), (req.params.id))
    .then((response) => {
        res.redirect('/carrito');
    })
})



router.post("/finalizar", (req, res) => {

    const { nombre, avatar, username } = req.user;
   // listarProductosCarrito((req.session.idcarrito))
   finalizarCarrito(req, res)
    .then((rows) => {

        res.render('pages/finalizar', { nombre, avatar, username, arrObjetosCarrito: rows, total: sumarTotal(rows), direccion_envio: req.body.direccion_envio, logueado: true })
    })
    .catch(err => console.log(err));

})
module.exports = router;