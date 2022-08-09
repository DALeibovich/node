const express = require('express');
const compression = require('compression')
// creamos el ruteo de la api 
const { Router } = express;
const router = Router();

router.get('/info', compression({
    level: 9
}));

module.exports = router;