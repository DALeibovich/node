/****** IMPORTAMOS CLASES DAOS CON CONEXION  ************/
const { usuariosDB } = require('../daos/importarClases');
const archivoUsuarios = usuariosDB;

const User = require('../models/User');

const listarUsuarios = async (id = '') => {
    console.log(archivoUsuarios.getAll())
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
const existeUsuario = async (id) => {
    let ret;
    await archivoUsuarios.getById((id))
        .then(response => {
            ret = response;
        })
    return ret;
}

const actualizaUsuario = async (req, id) => {
    let ret;
    let avatar;
    let { nombre, email, username, edad, direccion, telefono} = req.body;
    if(req.files){
        
         await subirAvatar(req);
         avatar = req.files.avatar.name;
    }else{
        avatar = req.user.avatar;
    }
    //if(!archivoUsuarios.existeEmail(email) && !archivoUsuarios.existeUsername(username)){
    let timestamp = Date.now();
    let objetoNuevo = { nombre, email, username, edad, direccion, telefono, avatar:avatar, timestamp };
    
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

const subirAvatar = async(req, res) => {
    let EDFile = req.files.avatar;
    EDFile.mv(`./public/img/users/${EDFile.name}`, err => {
        if (err) console.log(err)
        return req.files.avatar.name
    })
}


const nuevoUsuario = async (req, res) => {
    let ret;
    let avatar;
    let { nombre, email, username, edad, direccion, telefono} = req.body;
    if(req.files){
        
         await subirAvatar(req);
         avatar = req.files.avatar.name;
    }else{
        avatar = req.user.avatar;
    }
    //if(!archivoUsuarios.existeEmail(email) && !archivoUsuarios.existeUsername(username)){
    let timestamp = Date.now();
    //let ultimo = await archivoUsuarios.ultimoId() ?? 0;
    let objetoNuevo = { nombre, email, username, edad, direccion, telefono, avatar:avatar, timestamp };
  console.log(objetoNuevo)
 
    //let user = new User(parseInt(ultimo) + 1, nombre, autor, foto, precio, descripcion, codigo, stock);

    await archivoUsuarios.save(objetoNuevo)
        .then(response => {
            ret = response;
        })

    return ret;
}

async function borrarUsuario(id) {

    let ret;
    // verifica existencia del producto  
    await archivoUsuarios.deleteById((id))
        .then(response => {
            ret = response;
        })

    return ret;
}
module.exports = {
   
    actualizaUsuario,
    existeUsuario,
    listarUsuarios,
    subirAvatar,
    nuevoUsuario,
    borrarUsuario
}