// obtenemos el controlador de productos con sus funciones
const express = require('express');
// creamos el ruteo de la api 
const { Router } = express;
const router = Router();
const path = require('path');
router.use(express.static(path.join(__dirname, '../public')));


const sessionCheck = (req, res, next) => {
    //if (req.session.user && req.cookies.user_sid) {
        if(req.user){
        res.redirect("/dashboard");
        return;
    }
    next();
};

router.get("/signup", (req, res) => {
    res.render('layouts/signup',{ message: req.query.message})
});

router.get("/", sessionCheck, (req, res) => {
    res.redirect("/login");
});

router.get("/login", sessionCheck, (req, res) => {
    res.render('layouts/login',{ message: req.query.message})
});



router.post("/login", (req, res) => {
    const { username } = req.body;
    req.session.user = { username: username };
    res.redirect("/dashboard");
});

router.get("/loginInfo", (req, res) => {
    //if (req.session.user && req.cookies.user_sid) {
        if(req.user){
        const username = req.user.username;
         res.json({username: username, email: req.user.email});
    }
});

router.get("/dashboard", (req, res) => {

    //if (req.session.user && req.cookies.user_sid) {
        if(req.user){
        res.sendFile(`dashboard.html`, { root: path.join(__dirname, '../public') });

    } else {
        res.redirect("/login");
    }
});

router.get("/logout", (req, res) => {
   // if (req.session.user && req.cookies.user_sid) {
    if(req.user){
        const username = req.user.username;
        req.logout(() => {
            req.user = null;

        });
        res.render('./layouts/logout', { username: username });
    } else {
        res.redirect("/login");
    }

});







module.exports = router;