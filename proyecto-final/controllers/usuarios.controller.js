const { archivoUsuarios, actualizaUsuarioService, listarUsuariosService, subirAvatarService, nuevoUsuarioService, borrarUsuarioService} = require('../services/usuarios.service');
const User = require('../models/User');

const existeUsuario= async (id) => {
    let ret = await listarUsuariosService(id);   
    return ret;
}
const listarUsuariosController = async (req, res) => {
    let id;
    if (req.params.id !== undefined) id = req.params.id;
    let existe = await existeUsuario(req.params.id);
    if (existe.length > 0) {
        listarUsuariosService(id)
            .then(rows => {               
                res.status(200).send(rows);
            })
    } else {
        res.status(201).send({ message: "No existe usuario" });
    }

}

const actualizaUsuarioController = async (req, res) => {
    let id;
    if (req.params.id !== undefined) id = req.params.id;
    let existe = await existeUsuario(req.params.id);
    if (existe.length > 0) {
        actualizaUsuarioService(req, req.params.id)
        .then((response) => {
            res.status(200).send(response);
        })
    } else {
        res.status(201).send({ message: "No existe usuario" });
    }

}


const borrarUsuarioController = async (req, res) => {
    let id;
    if (req.params.id !== undefined) id = req.params.id;
    let existe = await existeUsuario(req.params.id);
    if (existe.length > 0) {
        borrarUsuarioService(req.params.id)
        .then((response) => {
            res.status(200).send(response);
        })
    } else {
        res.status(201).send({ message: "No existe usuario" });
    }

}


const nuevoUsuarioController = async (req, res) => {
    
  

    nuevoUsuarioService(req)
        .then(rows => {
            res.status(200).send(rows);
        })
        .catch(err => res.status(201).send(err))
}

/*



router.post('/api/usuarios', (req, res) => {
    nuevoUsuario(req)
        .then(response => {
            res.status(201).json(response)
        })
        .catch(err => console.log(err));
});




*/
module.exports =  { 
    listarUsuariosController,
    actualizaUsuarioController,  
    nuevoUsuarioController, 
    borrarUsuarioController 
} 