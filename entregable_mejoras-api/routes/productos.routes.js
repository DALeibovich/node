// obtenemos el controlador de productos con sus funciones
const { agregarProductosController, fakerProductosController, HBSfakerProductosController, PUGfakerProductosController, EJSfakerProductosController } = require('../controllers/productos.controller');
const express = require('express');
//archivoLibros.arrObjetos = fakerProductos(5);

// creamos el ruteo de la api 
const { Router } = express;
const router = Router();

// rutea todos los productos 
router.get('/api/productos', fakerProductosController);
router.get('/api/productos-test', fakerProductosController);

router.post('/api/productos', agregarProductosController);

router.get("/productos/hbs", HBSfakerProductosController);
router.get("/productos/ejs", EJSfakerProductosController);
router.get("/productos/pug", PUGfakerProductosController);




module.exports = router;