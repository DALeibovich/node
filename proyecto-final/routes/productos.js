// obtenemos el controlador de productos con sus funciones
const { archivoLibros, listarProductos, existeProducto, borrarProducto, actualizaProducto, escribirArchivo, nuevoProducto } = require('../controllers/productos');

// creamos el ruteo de la api 
const express = require('express');
const { Router } = express;
const router = Router();

// obtiene todos los productos
router.get('/', (req, res) => {
    listarProductos()
        .then((rows) => {
            res.status(200).send(rows);
        })
});

// rutea el producto segun ID
router.get('/:id', (req, res) => {
    listarProductos(req.params.id)
        .then((rows) => {
            res.status(200).send(rows);

        })
});

// endPoint para agregar productos
router.post('/', (req, res) => {
       nuevoProducto(req.body)
            .then(response => {
                res.status(201).json(response)
            })
            .catch(err => console.log(err));
});

// endPoint para borrar productos
router.delete('/:id', (req, res) => {
    borrarProducto((req.params.id))
        .then((response) => {
            res.json(response);
        })
});

// endPoint para actualizar productos
router.put('/:id', (req, res) => {
    actualizaProducto(req.body, req.params.id)
        .then((response) => {
            res.json(response);
        })
});


// endPoint para simular el put y delete cuando vienen por forms
/*
router.post('/:id', (req, res) => {
    if (req.body._method == 'put') {
        // actualiza el producto desde el form -> ejecutar el put
        let { nombre, autor, precio, foto, descripcion, codigo, stock } = req.body;
        let id = parseInt(req.params.id);
        
        let objetoNuevo = { id, nombre, autor, precio, foto, descripcion, codigo, stock };
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