/****** IMPORTAMOS CLASES DAOS CON CONEXION  ************/
const { usuariosDB } = require('../daos/importarClases');
const archivoUsuarios = usuariosDB;
const fileUpload = require('express-fileupload');
const User = require('../models/User');
const { createHash, isValidPassword } = require('../utils/bcrypt.js')

const listarUsuariosService = async (id = '') => {
   // console.log(archivoUsuarios.getAll())
    let ret;
    if (id == '') {
        ret = await archivoUsuarios.getAll()
            .then(rows => { return rows })
            .catch(err => console.log(err));
    } else {
        ret = await archivoUsuarios.getById(id)
            .then(rows => { return rows })
            .catch(err => console.log(err));
    }
    return ret;
}
// funcion para verificar existencia del producto
/*const existeUsuario = async (id) => {
    let ret;
    await archivoUsuarios.getById((id))
        .then(response => {
            ret = response;
        })
    return ret;
}*/


const actualizaUsuarioService2 = async (objetoNuevo, id) => {
    await archivoUsuarios.actualizaArchivo(objetoNuevo, id)
 
        return objetoNuevo;
   

}



const actualizaUsuarioService = async (req, id) => {
    fileUpload();
    let ret;
    let avatar;
    let { nombre, email, username, edad, direccion, telefono} = req.body;
    if(req.files){
        
         await subirAvatarService(req);
         avatar = req.files.avatar.name;
    }else{
        avatar = req.body.avatar;
    }
    //if(!archivoUsuarios.existeEmail(email) && !archivoUsuarios.existeUsername(username)){
    let timestamp = Date.now();
    let objetoNuevo = { nombre, email, username, edad, direccion, telefono, password: createHash(req.body.password), avatar:avatar, timestamp };
    
    await archivoUsuarios.actualizaArchivo(objetoNuevo, id)
        .then((rows) => {
            
            req.user = objetoNuevo;
            ret = objetoNuevo;
        })
      
    //}else{
      //  ret = 'El username o Email ya existe';
   // }
    return ret;
}

const subirAvatarService = async(req, res) => {
    let EDFile = req.files.avatar;
    EDFile.mv(`./public/img/users/${EDFile.name}`, err => {
        if (err) console.log(err)
        return req.files.avatar.name
    })
}


const nuevoUsuarioService = async (req, res) => {
    fileUpload();
    let ret;
    let avatar;
    let { nombre, email, username, edad, direccion, telefono, perfil} = req.body;
    if(req.files){
        
         await subirAvatarService(req);
         avatar = req.files.avatar.name;
    }else{
        avatar = req.user.avatar;
    }
    //if(!archivoUsuarios.existeEmail(email) && !archivoUsuarios.existeUsername(username)){
    let timestamp = Date.now();
    //let ultimo = await archivoUsuarios.ultimoId() ?? 0;
    let objetoNuevo = { nombre, email, username, edad, direccion, telefono, perfil, password: createHash(req.body.password), avatar:avatar, timestamp };
  //console.log(objetoNuevo)
 
    //let user = new User(parseInt(ultimo) + 1, nombre, autor, foto, precio, descripcion, codigo, stock);

    await archivoUsuarios.save(objetoNuevo)
        .then(response => {
            ret = response;
        })

    return ret;
}

async function borrarUsuarioService(id) {

    let ret;
    // verifica existencia del producto  
    await archivoUsuarios.deleteById((id))
        .then(response => {
            ret = response;
        })

    return ret;
}
module.exports = {   
    actualizaUsuarioService,    
    listarUsuariosService,
    subirAvatarService,
    nuevoUsuarioService,
    borrarUsuarioService,
    archivoUsuarios,
    actualizaUsuarioService2
}