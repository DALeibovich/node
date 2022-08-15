// obtenemos el controlador de productos con sus funciones
const { getProductosController, actualizarProductosController, borrarProductosController, agregarProductosController, fakerProductosController, HBSfakerProductosController, PUGfakerProductosController, EJSfakerProductosController } = require('../controllers/productos.controller');
//const express = require('express');

// creamos el ruteo de la api 
//const { Router } = express;
//const router = Router();
const Router = require('koa-router');
const router = new Router();
// rutea todos los productos 

router.get('/api/productos-test', fakerProductosController);

router.get('/api/productos', getProductosController);
router.post('/api/productos', agregarProductosController);
router.put('/api/productos/:id',actualizarProductosController)
router.delete('/api/productos/:id',borrarProductosController)

router.get("/productos/hbs", HBSfakerProductosController);
router.get("/productos/ejs", EJSfakerProductosController);
router.get("/productos/pug", PUGfakerProductosController);




module.exports = router;