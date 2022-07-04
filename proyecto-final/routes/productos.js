// obtenemos el controlador de productos con sus funciones
const { archivoLibros, existeProducto, borrarProducto, actualizaProducto, escribirArchivo, nuevoProducto } = require('../controllers/productos');

// creamos el ruteo de la api 
const express = require('express');
const { Router } = express;
const router = Router();

// rutea todos los productos 
/*const administrador = false;
router.get('/', (req, res, next) => {
    if(administrador == true){
        next();
    }else{
    res.status(401).send({error: -1, message: `No tiene acceso a esta ${req.baseUrl}`});
    }
});
*/
router.get('/', (req, res) => {
    res.status(200).send(archivoLibros.arrObjetos);
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
        let productoNuevo = nuevoProducto(req.body);
        archivoLibros.save(productoNuevo)
            .then(response => {
                //console.log(req.params)
                res.status(201).json(archivoLibros.arrObjetos)
            })
            .catch(err => console.log(err));
    }
});

// endPoint para borrar productos
router.delete('/:id', (req, res) => {
    // Busca un objeto por ID
    borrarProducto(parseInt(req.params.id))
        .then((response) => {
            res.json(response);
        })

});

// endPoint para actualizar productos
router.put('/:id', (req, res) => {

    let { nombre, autor, precio, foto, descripcion, codigo, stock} = req.body;
    let id = parseInt(req.params.id);
    let timestamp = Date.now();
    let objetoNuevo = { id, nombre, autor, precio, foto, descripcion, codigo, stock, timestamp };
    actualizaProducto(objetoNuevo, id)
        .then((response) => {
            res.json(response);
        })
});


// endPoint para simular el put y delete cuando vienen por forms
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

module.exports = router;