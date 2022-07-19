// obtenemos el controlador de productos con sus funciones
const express = require('express');
const passport = require('passport');
//const { initializePassport } = require('../controllers/strategy-validation/localPassport');
// creamos el ruteo de la api 
const { Router } = express;
const router = Router();

/*const controlLogin = (req, res, next) => {
    if (!req.session.user || !req.cookies.user_sid) {
        res.redirect("/login");
        return;
    }
    next();
};*/

const controlLogin = (req, res, next) => {
    if(!req.user){
    //if (!req.session.user || !req.cookies.user_sid) {
        res.redirect("/login");
        return;
    }
    next();
};





router.post('/register', passport.authenticate('register', { failureRedirect: '/signup?message=El usuario o email ya existe'}), (req, res) => {
    //res.send({message: "signed up"})
    res.redirect('/dashboard')
})


router.get('/failedRegister', (req, res) => {
    res.send({error: "I cannot register"})
})

router.post('/login', passport.authenticate('login', { failureRedirect: '/login?message=Usuario o contraseña incorrectos'}), (req, res) => {
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
router.get("/productos/hbs", controlLogin);
router.get("/productos/ejs", controlLogin);
router.get("/productos/pug", controlLogin);

module.exports = router;