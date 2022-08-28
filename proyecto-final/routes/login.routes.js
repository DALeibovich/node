// obtenemos el controlador de productos con sus funciones
const express = require('express');
// creamos el ruteo de la api 
const { Router } = express;
const router = Router();
const path = require('path');
router.use(express.static(path.join(__dirname, '../public')));


const sessionCheck = (req, res, next) => {
    //if (req.session.user && req.cookies.user_sid) {
    if (req.user) {
        res.redirect("/dashboard");
        return;
    }
    next();
};




router.get("/signup", (req, res) => {
    if (req.user) {
        res.redirect("/dashboard");
    }
    res.render('pages/signup', { message: req.query.message })
});


router.get("/restringido", (req, res) => {
    res.render('pages/restringido')
});

router.get("/", sessionCheck, (req, res) => {
    res.redirect("/login");
});

router.get("/login", sessionCheck, (req, res) => {
    res.render('pages/login', { message: req.query.message})
});


router.post("/login", (req, res) => {
    const { username } = req.body;
    req.session.user = { username: username };
    res.redirect("/dashboard");
});

router.get("/loginInfo", (req, res) => {
    //if (req.session.user && req.cookies.user_sid) {
    if (req.user) {
        const username = req.user.username;
        res.json({ username: username, email: req.user.email });
    }
});



router.get("/logout", (req, res) => {
    // if (req.session.user && req.cookies.user_sid) {
    if (req.user) {
        const username = req.user.username;
        req.logout(() => {
            req.user = null;

        });
        res.render('pages/logout', { username: username});
    } else {
        res.redirect("/login");
    }

});



module.exports = router;