// obtenemos el controlador de productos con sus funciones
const { listarUsuariosController, actualizaUsuarioController, nuevoUsuarioController,  borrarUsuarioController  } = require('../controllers/usuarios.controller');
const fileUpload = require('express-fileupload');
// creamos el ruteo de la api 
const express = require('express');
const { Router } = express;
const router = Router();
router.use(express.json());
router.use(express.urlencoded({ extended: true }));

/// CRUD APIS USUARIOS


router.get('/',listarUsuariosController);

router.get('/:id',listarUsuariosController);

router.post('/',nuevoUsuarioController);

router.put('/:id',actualizaUsuarioController);

router.delete('/:id',borrarUsuarioController);
/*
router.put('/api/usuarios/:id', (req, res) => {
    actualizaUsuario(req, req.params.id)
        .then((response) => {
            res.json(response);
        })
});

router.post('/api/usuarios', (req, res) => {
    nuevoUsuario(req)
        .then(response => {
            res.status(201).json(response)
        })
        .catch(err => console.log(err));
});


router.delete('/api/usuarios/:id', (req, res) => {
    borrarUsuario((req.params.id))
        .then((response) => {
            res.json(response);
        })
});
*/
module.exports = router;