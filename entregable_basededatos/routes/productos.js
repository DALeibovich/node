// obtenemos el controlador de productos con sus funciones
const { archivoLibros, existeProducto, borrarProducto, actualizaProducto, escribirArchivo } = require('../controllers/productos');
const express = require('express');


// creamos el ruteo de la api 
const { Router } = express;
const router = Router();

// rutea todos los productos 
router.get('/api/productos', (req, res) => {
    res.status(200).send(archivoLibros.arrObjetos);
});


// endPoint para agregar productos

router.get("/productos/hbs", function (req, res) {
    //const app = express();
    //app.set("view engine", "hbs")
    let arr = [...archivoLibros.arrObjetos];
    arr.sort(function (b, a) { return a.id - b.id });
    res.render("productos", { arrObjetos: arr });
});

router.get("/productos/pug", function (req, res) {
    let arr = [...archivoLibros.arrObjetos];
    arr.sort(function (b, a) { return a.id - b.id });
    res.render("layouts/index.pug", { arrObjetos: arr });
});

router.get("/productos/ejs", function (req, res) {
    let arr = [...archivoLibros.arrObjetos];
    arr.sort(function (b, a) { return a.id - b.id });
    res.render("layouts/index.ejs", { arrObjetos: arr });
});


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




// endPoint para guardar productos en un archivo
router.post('/api/guardar', (req, res) => {
    // escribe el archivo
    escribirArchivo((req.body.nombrearchivo))
        .then((response) => {
            res.json(response);
        })

});

module.exports = router;