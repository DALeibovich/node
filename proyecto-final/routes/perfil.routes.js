// obtenemos el controlador de productos con sus funciones
const { actualizaPerfilController, verPerfilController } = require('../controllers/perfil.controller');
//const fileUpload = require('express-fileupload');
// creamos el ruteo de la api 
const express = require('express');
const { Router } = express;
const router = Router();
//router.use(express.json());
//router.use(express.urlencoded({ extended: true }));

router.get("/perfil",verPerfilController);
router.post('/perfil',actualizaPerfilController);

module.exports = router;