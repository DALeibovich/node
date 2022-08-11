// obtenemos el controlador de productos con sus funciones
const { getProductosController, actualizarProductosController, borrarProductosController, agregarProductosController, fakerProductosController, HBSfakerProductosController, PUGfakerProductosController, EJSfakerProductosController } = require('../controllers/productos.controller');
const { productoSchema, rootProducto,  queryGetProductos,  queryGetProductosById, mutationAddProductos, mutationUpdateProductos, mutationDeleteProductos } = require('../controllers/productos.graphql.controller');
const { graphqlHTTP } = require('express-graphql');

const express = require('express');

// creamos el ruteo de la api 
const { Router } = express;
const router = Router();

// rutea todos los productos 

router.get('/api/productos-test', fakerProductosController);

/// CRUD GRAPHQL API
router.get('/api/productos', queryGetProductos);
router.get('/api/productos/:id', queryGetProductosById);
router.post('/api/productos', mutationAddProductos);
router.put('/api/productos/:id',mutationUpdateProductos);
router.delete('/api/productos/:id',mutationDeleteProductos)

/// CRUD REST API
/*router.get('/api/productos', getProductosController);
router.post('/api/productos', agregarProductosController);
router.put('/api/productos/:id',actualizarProductosController)
router.delete('/api/productos/:id',borrarProductosController)
*/

router.get("/productos/hbs", HBSfakerProductosController);
router.get("/productos/ejs", EJSfakerProductosController);
router.get("/productos/pug", PUGfakerProductosController);

router.use('/graphql',  graphqlHTTP({
    schema: productoSchema,
    rootValue: rootProducto,
    graphiql: true
})

)


module.exports = router;