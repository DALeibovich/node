// obtenemos el controlador de shopping con sus funciones
const { SHOPactualizaCantidadProductoCarritosController, SHOPexisteProductoController, SHOPexisteOrdenesController, SHOPlistarProductosGeneroController, SHOPlistarProductosController, SHOPlistarPedidosController, SHOPborrarProductosCarritosController, SHOPlistarProductosCarritosController, SHOPagregarProductosCarritosController, SHOPfinalizarCarritosController} = require('../controllers/shop.controller.js');
const express = require('express');

// creamos el ruteo del shopping
const { Router } = express;
const router = Router();

// ruteo para alias
router.get("/dashboard",(req,res) => res.redirect('/productos'));
router.get("/productos/categoria",(req,res) => res.redirect('/productos'));

// ruteo para productos
router.get("/productos",SHOPlistarProductosController);
router.get("/productos/:id",SHOPexisteProductoController, SHOPlistarProductosController);
//router.get("/productos/categoria/",SHOPlistarProductosGeneroController);
router.get("/productos/categoria/:genero",SHOPlistarProductosGeneroController);

// ruteo para carritos
router.get("/carrito",SHOPlistarProductosCarritosController);
router.get("/carrito/add/:id", SHOPexisteProductoController, SHOPagregarProductosCarritosController)
router.get("/carrito/q/:id",SHOPexisteProductoController, SHOPborrarProductosCarritosController);
router.post("/carrito/qty/:id",SHOPexisteProductoController, SHOPactualizaCantidadProductoCarritosController);
router.post("/carrito/finalizar",SHOPfinalizarCarritosController);

// ruteo para pedidos
router.get("/pedidos",SHOPlistarPedidosController);
router.get("/pedidos/:id",SHOPexisteOrdenesController, SHOPlistarPedidosController);



module.exports = router; 
