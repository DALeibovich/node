const {getMensajesController, agregaMensajesController} = require('../controllers/foros.controller');
//const express = require('express');


// creamos el ruteo de la api 
//const { Router } = express;
//const router = Router();
const Router = require('koa-router');
const router = new Router();
router.get('/api/foros', getMensajesController);
router.post('/api/foros', agregaMensajesController);

module.exports = router;