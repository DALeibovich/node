// obtenemos el controlador de productos con sus funciones
const express = require('express');
// creamos el ruteo de la api 
const { Router } = express;
const router = Router();
const path = require('path');
router.use(express.static(path.join(__dirname, '../public')));


const sessionCheck = (req, res, next) => {
    if (req.session.user && req.cookies.user_sid) {
        res.redirect("/dashboard");
        return;
    }
    next();
};

router.get("/", sessionCheck, (req, res) => {
    res.redirect("/login");
});

router.get("/login", sessionCheck, (req, res) => {
    res.render('layouts/login')
});

router.post("/login", (req, res) => {
    const { username } = req.body;
    req.session.user = { username: username };
    res.redirect("/dashboard");
});

router.get("/loginInfo", (req, res) => {
    if (req.session.user && req.cookies.user_sid) {
        const username = req.session.user.username;
         res.json({username: username});
    }
});

router.get("/dashboard", (req, res) => {

    if (req.session.user && req.cookies.user_sid) {
        res.sendFile(`dashboard.html`, { root: path.join(__dirname, '../public') });

    } else {
        res.redirect("/login");
    }
});

router.get("/logout", (req, res) => {
    if (req.session.user && req.cookies.user_sid) {
        const username = req.session.user.username;
        req.session.destroy(() => {
            req.session = null;

        });
        res.render('./layouts/logout', { username: username });
    } else {
        res.redirect("/login");
    }

});





module.exports = router;