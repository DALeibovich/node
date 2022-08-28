// obtenemos el controlador de carritos con sus funciones
const { existeProductoController, existeCarritoController, listarCarritosController, actualizarCarritosController, borrarCarritosController, borrarProductosCarritosController, listarProductosCarritosController, agregarCarritosController, agregarProductosCarritosController} = require('../controllers/carritos.controller');
const express = require('express');

// creamos el ruteo de la api 
const { Router } = express;
const router = Router();

/// CRUD REST API
// endPoint para listar carritos
router.get('/', listarCarritosController);

// endPoint para listar un carrito especifico
router.get('/:id', existeCarritoController, listarCarritosController);

// endPoint para crear un carrito vacio
router.post('/', agregarCarritosController);

// endPoint para actualizar info de un carrito
router.put('/:id',existeCarritoController, actualizarCarritosController);

// endPoint para borrar un carrito
router.delete('/:id',existeCarritoController, borrarCarritosController);

// endPoint para listar productos del carritos
router.get('/:id/productos', existeCarritoController, listarProductosCarritosController);

// endPoint para agregar un producto al carrito
router.post('/:id/productos', existeCarritoController, existeProductoController, agregarProductosCarritosController);

// endPoint para eliminar un producto al carrito
router.delete('/:id/productos/', existeCarritoController, existeProductoController, borrarProductosCarritosController);


module.exports = router;




