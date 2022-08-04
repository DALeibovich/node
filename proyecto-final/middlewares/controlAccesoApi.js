require('dotenv').config();
const express = require('express');
const { Router } = express;
const router = Router();

console.log(process.env.ADMINISTRADOR)
const administrador = process.env.ADMINISTRADOR;
// rutea todos los productos 
const esAdmin = (req, res, next) =>{
    (administrador == "true") ? next() : res.status(401).send({ error: -1, descripcion: `Ruta ${req.baseUrl + req.url} metodo ${req.method} no autorizada` });
}
 
// control de permisos de rutas para las API
router.post('/productos', esAdmin);
router.put('/productos/:id', esAdmin);
router.delete('/productos/:id', esAdmin);
router.post('/usuarios', esAdmin);
router.put('/usuarios/:id', esAdmin);
router.delete('/usuarios/:id', esAdmin);
//router.delete('/carrito/*', esAdmin);
module.exports = router;    