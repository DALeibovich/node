// obtenemos el controlador de productos con sus funciones
require('dotenv/config')
//const express = require('express');
const core = require('os');
// creamos el ruteo de la api 
//const { Router } = express;
//const router = Router();
const Router = require('koa-router');
const router = new Router();
router.get("/info", (req, res) => {
    res.render('layouts/infoProcess',{process, cpu: core.cpus().length})
});


module.exports = router;