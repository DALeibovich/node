// obtenemos el controlador de productos con sus funciones
const { eliminarProductosCarrito, listarProductosCarrito, archivoCarritos, nuevoCarrito, borrarCarrito, agregarProducto} = require('../controllers/carritos');

// creamos el ruteo de la api 
const express = require('express');
const { Router } = express;
const router = Router();

// rutea todos los productos 
router.get('/', (req, res) => {
    res.status(200).send(archivoCarritos.arrObjetos);
});

// rutea el producto segun ID
router.get('/:id', (req, res) => {

    // Busca un objeto por ID
    let objeto = existeProducto(parseInt(req.params.id));
    (objeto === undefined) ? res.status(404).json({ error: 'Producto no encontrado' }) : res.status(200).json(objeto);
});

// endPoint para agregar productos
router.post('/', (req, res) => {

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

// endPoint para borrar productos
router.delete('/:id', (req, res) => {
    // Borrar un objeto por ID
    borrarCarrito(parseInt(req.params.id))
        .then((response) => {
            res.json(response);
        })

});


router.get('/:id/productos', (req, res) => {
    listarProductosCarrito(parseInt(req.params.id))
    .then((response) => {
        res.json(response);
    })
});


router.post('/:id/productos', (req, res) => {
    agregarProducto(parseInt(req.params.id), parseInt(req.body.id))
    .then((response) => {
        res.json(response);
    })
});

router.delete('/:id/productos/:id_prod', (req, res) => {
    eliminarProductosCarrito(parseInt(req.params.id), parseInt(req.params.id_prod))
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