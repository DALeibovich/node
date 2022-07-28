// obtenemos el controlador de productos con sus funciones
const express = require('express');
// creamos el ruteo de la api 
const { Router } = express;
const router = Router();

const controlLogin = (req, res, next) => {
    if (!req.session.user || !req.cookies.user_sid) {
        res.redirect("/login");
        return;
    }
    next();
};


router.get("/productos/hbs", controlLogin);
router.get("/productos/ejs", controlLogin);
router.get("/productos/pug", controlLogin);

module.exports = router;