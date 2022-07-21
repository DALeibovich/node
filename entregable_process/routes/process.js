// obtenemos el controlador de productos con sus funciones
require('dotenv/config')
const express = require('express');
// creamos el ruteo de la api 
const { Router } = express;
const router = Router();

router.get("/info", (req, res) => {
    res.render('layouts/infoProcess',{process})
});


module.exports = router;