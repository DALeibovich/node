// obtenemos el controlador de productos con sus funciones
const express = require('express');
const passport = require('passport');
const fileUpload = require('express-fileupload');
const {enviarEmail} = require('../utils/mailer');
const os = require("os");
require('dotenv/config');
// creamos el ruteo de la api 
const { Router } = express;
const router = Router();

router.use(fileUpload())


const controlLogin = (req, res, next) => {
    if (!req.user) {
       
        res.redirect("/login");
        return;
    }
    next();
};





router.post('/register', passport.authenticate('register', { failureRedirect: '/signup?message=El usuario o email ya existe' }), (req, res) => {
    //res.send({message: "signed up"})
    let EDFile = req.files.avatar;
    EDFile.mv(`./public/img/users/${EDFile.name}`, err => {
        if (err) console.log(err)
        return true
    })
    const hostname = os.hostname();
    console.log(hostname)
    const cuerpo = `<b>Nombre:</b> ${req.user.nombre} <br>
    <b>Username:</b> ${req.user.username} <br>
    <b>Email:</b> ${req.user.email} <br>
    <b>Direccion:</b> ${req.user.direccion} <br>
    <b>Edad:</b> ${req.user.edad} años <br>    
    
    `;
    enviarEmail(process.env.ADMINISTRADOR_EMAIL,'Nuevo usuario registrado',cuerpo);
    res.redirect('/dashboard')
})


router.get('/failedRegister', (req, res) => {
    res.send({ error: "I cannot register" })
})

router.post('/login', passport.authenticate('login', { failureRedirect: '/login?message=Usuario o contraseña incorrectos' }), (req, res) => {
    // res.send({message: "Logged In"})
    res.redirect('/dashboard')
})
/*
router.get('/failedLogin', (req, res) => {
    res.send({error: "I cannot login"})
})
*/

router.get('/currentSession', (req, res) => {
    // res.send(req.session)
    res.send(req.user)
})

/*
router.get('/logout', (req, res) => {
    req.logout((err) => {
        if (err) { console.log(err) }
        else next();
    })
})
*/
router.get("/info", controlLogin);
router.get("/perfil", controlLogin);
router.get("/carrito", controlLogin);

module.exports = router;