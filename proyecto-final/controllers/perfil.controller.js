// obtenemos el controlador de productos con sus funciones
const { subirAvatarService, actualizaUsuarioService, actualizaUsuarioService2, listarUsuariosService } = require('../services/usuarios.service');
const fileUpload = require('express-fileupload');


const admin = (perfil) => {
    return (perfil == 'admin') ? true : false;
}

const verPerfilController = async (req, res) => {
    const { nombre, email, direccion, telefono, username, avatar, edad } = req.user;
    res.render('pages/perfil', { nombre, email, direccion, telefono, username, avatar, edad, logueado: true, admin: admin(req.user.perfil) })
}


const actualizaPerfilController2 = async (req, res) => {
    fileUpload();
    actualizaUsuarioService(req, req.user.id)
        .then((response) => {
            console.log('perfil 2')
            //res.redirect('/perfil');
            req.user = objetoNuevo;
            const { nombre, email, direccion, telefono, username, avatar, edad } = response;
            res.render('pages/perfil', { nombre, email, direccion, telefono, username, avatar, edad, logueado: true, admin: admin(req.user.perfil), notificacion: { mensaje: 'El perfil se actualizo con exito', color: 'green' } })
        })

}




const actualizaPerfilController = async (req, res) => {
    fileUpload();
    let ret;
    let avatar;
    let { nombre, email, username, edad, direccion, telefono } = req.body;
    if (req.files) {
        await subirAvatarService(req);
        avatar = req.files.avatar.name;
    } else {
        avatar = req.user.avatar;
    }
    //if(!archivoUsuarios.existeEmail(email) && !archivoUsuarios.existeUsername(username)){
    let timestamp = Date.now();
    let objetoNuevo = { nombre, email, username, edad, direccion, telefono, avatar: avatar, timestamp };

    await actualizaUsuarioService2(objetoNuevo, req.user.id)
        .then((response) => {
            console.log(response);
            //const { nombre, email, direccion, telefono, username, avatar, edad } = response;
            res.render('pages/perfil', { nombre, email, direccion, telefono, username, avatar, edad, logueado: true, admin: admin(req.user.perfil), notificacion: { mensaje: 'El perfil se actualizo con exito', color: 'green' } })
        })

    //}else{
    //  ret = 'El username o Email ya existe';
    // }
    return ret;
}


/*router.get("/perfil", (req, res) => {
    const { nombre, email, direccion, telefono, username, avatar, edad } = req.user;
    
    res.render('pages/perfil', { nombre, email, direccion, telefono, username, avatar, edad, logueado: true, admin: admin(req.user.perfil) })
});*/
/*
router.post('/perfil', (req, res) => {
    console.log('perfil')
    fileUpload();
    //router.use(fileUpload())
    actualizaUsuario(req, req.user.id)
        .then((response) => {
            console.log('perfil 2')
            //res.redirect('/perfil');
            const { nombre, email, direccion, telefono, username, avatar, edad } = response;
            res.render('pages/perfil', { nombre, email, direccion, telefono, username, avatar, edad, logueado: true,  admin: admin(req.user.perfil), notificacion: { mensaje: 'El perfil se actualizo con exito', color: 'green' } })
        })

    })
*/
module.exports = {
    actualizaPerfilController,
    verPerfilController
}