// obtenemos el controlador de productos con sus funciones
const { actualizaUsuario, listarUsuarios, nuevoUsuario, borrarUsuario } = require('../controllers/usuarios');
const fileUpload = require('express-fileupload');
// creamos el ruteo de la api 
const express = require('express');
const { Router } = express;
const router = Router();
router.use(express.json());
router.use(express.urlencoded({ extended: true }));



router.get("/perfil", (req, res) => {
    const { nombre, email, direccion, telefono, username, avatar, edad } = req.user;
    res.render('pages/perfil', { nombre, email, direccion, telefono, username, avatar, edad, logueado: true })
});

router.post('/perfil', (req, res) => {
    fileUpload();
    //router.use(fileUpload())
    actualizaUsuario(req, req.user._id)
        .then((response) => {
            //res.redirect('/perfil');
            const { nombre, email, direccion, telefono, username, avatar, edad } = response;
            res.render('pages/perfil', { nombre, email, direccion, telefono, username, avatar, edad, logueado: true, notificacion: { mensaje: 'El perfil se actualizo con exito', color: 'green' } })
        })




});
/// CRUD APIS USUARIOS


router.get('/api/usuarios/', (req, res) => {
    listarUsuarios()
        .then((rows) => {
            res.status(200).send(rows);

        })
});

router.get('/api/usuarios/:id', (req, res) => {
    listarUsuarios(req.params.id)
        .then((rows) => {
            res.status(200).send(rows);

        })
});

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
module.exports = router;