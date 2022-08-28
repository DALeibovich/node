// obtenemos el controlador de productos con sus funciones
const { listarProductosController, actualizarProductosController, borrarProductosController, agregarProductosController} = require('../controllers/productos.controller');
const express = require('express');

// creamos el ruteo de la api 
const { Router } = express;
const router = Router();

// rutea todos los productos 

//router.get('/api/productos-test', fakerProductosController);


/// CRUD REST API
router.get('/', listarProductosController);
router.get('/:id', listarProductosController);
router.post('/', agregarProductosController);
router.put('/:id',actualizarProductosController)
router.delete('/:id',borrarProductosController)



module.exports = router;