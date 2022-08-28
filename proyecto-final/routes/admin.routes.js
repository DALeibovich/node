// obtenemos el controlador del Administrador
const { ADMINexisteProductoController, ADMINexisteOrdenesController, ADMINchatsController, ADMINvisualizarConfigController, ADMINactualizarProductosController, ADMINborrarProductosController, ADMINagregarProductosController, ADMINlistarPedidosController, ADMINlistarProductosController } = require('../controllers/admin.controller');

// creamos las rutas del administador
const express = require('express');
const { Router } = express;
const router = Router();

// ruteo para pedidos
router.get("/admin/pedidos", ADMINlistarPedidosController);
router.get("/admin/pedidos/:id", ADMINexisteOrdenesController, ADMINlistarPedidosController);

// ruteo para CRUD productos
router.get("/admin/productos", ADMINlistarProductosController);
router.get("/admin/productos/:id", ADMINexisteProductoController, ADMINlistarProductosController);
router.post("/admin/productos", ADMINagregarProductosController);
router.post("/admin/productos/:id", ADMINexisteProductoController, ADMINactualizarProductosController);
router.get('/admin/productos/delete/:id', ADMINexisteProductoController, ADMINborrarProductosController);

// ruteo para configuracion
router.get("/admin/config",ADMINvisualizarConfigController);

// ruteo apra chat
router.get("/admin/chats",ADMINchatsController);
router.get("/admin/chats/:destino",ADMINchatsController);


module.exports = router;