// obtenemos el controlador de productos con sus funciones
const { archivoLibros, existeProducto, borrarProducto, actualizaProducto, escribirArchivo } = require('../controllers/productos');

// creamos el ruteo de la api 
const express = require('express');
const { Router } = express;
const router = Router();

// rutea todos los productos 
router.get('/api/productos', (req, res) => {
    res.status(200).send(archivoLibros.arrObjetos);
});

// rutea el producto segun ID
router.get('/api/productos/:id', (req, res) => {

    // Busca un objeto por ID
    let objeto = existeProducto(parseInt(req.params.id));
    (objeto === undefined) ? res.status(404).json({ error: 'Producto no encontrado' }) : res.status(200).json(objeto);
});

// endPoint para agregar productos
router.post('/api/productos', (req, res) => {

    if (req.body.id === undefined) {
        // agrega un producto nuevo y le asigna un ID
        archivoLibros.save(req.body)
            .then(response => {
                //console.log(req.params)
                res.status(201).json(archivoLibros.arrObjetos)
            })
            .catch(err => console.log(err));
    }
});

// endPoint para borrar productos
router.delete('/api/productos/:id', (req, res) => {
    // Busca un objeto por ID
    borrarProducto(parseInt(req.params.id))
        .then((response) => {
            res.json(response);
        })

});

// endPoint para actualizar productos
router.put('/api/productos/:id', (req, res) => {

    let { titulo, autor, precio, foto } = req.body;
    let id = parseInt(req.params.id);
    let objetoNuevo = { id, titulo, autor, precio, foto };
    actualizaProducto(objetoNuevo, id)
        .then((response) => {
            res.json(response);
        })
});


// endPoint para simular el put y delete cuando vienen por forms
router.post('/api/productos/:id', (req, res) => {
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
router.post('/api/guardar', (req, res) => {
    // escribe el archivo
    escribirArchivo((req.body.nombrearchivo))
        .then((response) => {
            res.json(response);
        })

});

module.exports = router;