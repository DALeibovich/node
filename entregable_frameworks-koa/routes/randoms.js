// obtenemos el controlador de productos con sus funciones
require('dotenv/config')
//const express = require('express');
const {generaRandoms} = require('../controllers/randoms')
// creamos el ruteo de la api 
//const { Router } = express;
//const router = Router();
const Router = require('koa-router');
const router = new Router();
router.get("/api/randoms", generaRandoms);

module.exports = router;