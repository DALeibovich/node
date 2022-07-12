// obtenemos el controlador de productos con sus funciones
const { listarCarritos, borrarCarritos, eliminarProductosCarrito, listarProductosCarrito, archivoCarritos, nuevoCarrito, agregarProducto} = require('../controllers/carritos');
//const { listarCarritos, borrarCarritos} = require('../controllers/carritos2');

// creamos el ruteo de la api 
const express = require('express');
const { Router } = express;
const router = Router();

// rutea todos los carritos 
router.get('/', (req, res) => {
    listarCarritos()
    .then((rows) => {
        res.status(200).send(rows);
    })
});

// rutea el carrito segun ID
router.get('/:id', (req, res) => {
    listarCarritos(req.params.id)
    .then((rows) => {
        res.status(200).send(rows);
    })});

// endPoint para agregar carritos

router.post('/', (req, res) => {
    nuevoCarrito()
         .then(response => {
             res.status(201).json(response)
         })
         .catch(err => console.log(err));
});
/*router.post('/', (req, res) => {
    if (req.body.id === undefined) {
        // agrega un producto nuevo y le asigna un ID
        let carritoNuevo = nuevoCarrito();
        archivoCarritos.save(carritoNuevo)
            .then(response => {
                //console.log(req.params)
                res.status(201).json(carritoNuevo)
            })
            .catch(err => console.log(err));
    }
});
*/

// endPoint para borrar carritos
router.delete('/:id', (req, res) => {
     borrarCarritos(req.params.id)
        .then((response) => {
            res.json(response);
        })

});

// endPoint para listar productos del carritos
router.get('/:id/productos', (req, res) => {
    listarProductosCarrito((req.params.id))
    .then((response) => {
        res.json(response);
    })
});

// endPoint para agregar un producto al carrito
router.post('/:id/productos', (req, res) => {
    agregarProducto((req.params.id), (req.body.id))
    .then((response) => {
        res.json(response);
    })
});

// endPoint para eliminar un producto al carrito
router.delete('/:id/productos/:id_prod', (req, res) => {
    eliminarProductosCarrito((req.params.id), (req.params.id_prod))
    .then((response) => {
        res.json(response);
    })
});


/*
// endPoint para actualizar productos
router.put('/:id', (req, res) => {

    let { titulo, autor, precio, foto } = req.body;
    let id = parseInt(req.params.id);
    let objetoNuevo = { id, titulo, autor, precio, foto };
    actualizaProducto(objetoNuevo, id)
        .then((response) => {
            res.json(response);
        })
});


// endPoint para simular el put y delete cuando vienen por forms
router.post('/:id', (req, res) => {
    if (req.body._method == 'put') {
        // actualiza el producto desde el form -> ejecutar el put
        let { titulo, autor, precio, foto } = req.body;
        let id = parseInt(req.params.id);
        let objetoNuevo = { id, titulo, autor, precio, foto };
        actualizaProducto(objetoNuevo, id)
            .then((response) => {
                res.json(response);
            })
    }

    if (req.body._method == 'delete') {

        borrarProducto(parseInt(req.params.id))
            .then((response) => {
                res.json(response);
            });

    }

});

// endPoint para guardar productos en un archivo
router.post('/guardar', (req, res) => {
    // escribe el archivo
    escribirArchivo((req.body.nombrearchivo))
        .then((response) => {
            res.json(response);
        })

});
*/
module.exports = router;