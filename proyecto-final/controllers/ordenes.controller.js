const { existeOrdenes, getOrdenesService, getOrdenesClienteService} = require('../services/ordenes.service');
//const { logger } = require('../middlewares/logs')

const listarOrdenesController = async (req, res) => {
    let id = req.params.id;
    let existe = await existeOrdenes(req.params.id);
    if (existe.length > 0) {
    if (id === null) {
        getOrdenesService()
         .then((rows) => { 
            res.status(200).send(rows);
         })
    } else {
        getOrdenesService(id)
        .then((rows) => { 
            res.status(200).send(rows);
        })
    }
} else {
    res.status(201).send({ message: "No existe producto" });
}
    //return res.status(401).send({ message: "Ocurrio un problema" });
}



const listarOrdenesClienteController = async (req, res) => {
    let id = req.params.id;
    if (id === null) {
        getOrdenesClienteService()
            .then(rows => {
                res.status(200).send(rows);
            })
    } else {
        getOrdenesClienteService(id)
            .then(rows => {
                res.status(200).send(rows);
            })
    }
    return res.status(401).send({ message: "Ocurrio un problema" });
}


const agregarOrdenesController = (req, res) => {
    addOrdenesService(req.body)
        .then(rows => {
            res.status(200).send(rows);
        })
}

const actualizarOrdenesController = (req, res) => {
    updateOrdenesService(req.body, req.params.id)
        .then(rows => {
            res.status(200).send(rows);
        })
}

const borrarOrdenesController = (req, res) => {
    deleteOrdenesService(req.params.id)
        .then(rows => {
            res.status(200).send(rows);
        })
}

module.exports = {
    listarOrdenesController,
    listarOrdenesClienteController,
    agregarOrdenesController,
    actualizarOrdenesController,
    borrarOrdenesController
}