// obtenemos el controlador de productos con sus funciones
const express = require('express');
const passport = require('passport');
const fileUpload = require('express-fileupload');
const {enviarEmail} = require('../utils/mailer');
const {EmailingDTO} = require('../dtos/mailing.dto');
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

const controlAdmin = (req, res, next) => {
    
    if (req.user.perfil !='admin') {               
        res.redirect("/restringido");
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
  
    const emailing = new EmailingDTO();
    const cuerpo = emailing.NuevoUsuario(req.user);

    enviarEmail(process.env.ADMINISTRADOR_EMAIL,'Nuevo usuario registrado',cuerpo);
    if(req.user.perfil =='admin') {
      
        res.redirect('/admin/productos');
    }else{
       
        res.redirect('/dashboard');
    }
    
})


router.get('/failedRegister', (req, res) => {
    res.send({ error: "I cannot register" })
})

router.post('/login', passport.authenticate('login', { failureRedirect: '/login?message=Usuario o contraseña incorrectos' }), (req, res) => {
    // res.send({message: "Logged In"})
    if(req.user.perfil =='admin') {       
        res.redirect('/admin/productos');
    }else{      
        res.redirect('/dashboard');
    }
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
router.use("/dashboard", controlLogin);
router.use("/perfil", controlLogin);
router.use("/carrito", controlLogin);
router.use("/carrito/*", controlLogin);
router.use("/productos", controlLogin);
router.use("/productos/*", controlLogin);
router.use("/pedidos", controlLogin);
router.use("/pedidos/*", controlLogin);
router.use("/chat", controlLogin);
router.use("/logout", controlLogin);

router.use("/admin/*", controlLogin, controlAdmin);



module.exports = router;