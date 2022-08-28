const { archivoLibros, agregarProductosService, getProductosService, actualizaProductoService, borrarProductoService } = require('../services/productos.service')
//const {productoSchema} = require('./graphql/productos.schema');
const Producto = require('../models/Productos');

const agregarProductosController = async (req, res) => {
    let ultimo = await archivoLibros.ultimoId() ?? 0;
    const { nombre, autor, foto, precio, descripcion, codigo, stock, genero } = req.body;
    let producto = new Producto(parseInt(ultimo) + 1, nombre, autor, foto, precio, descripcion, codigo, stock, genero);

    agregarProductosService(producto)
        .then(rows => {
            res.status(200).send(rows);
        })
}

const existeProducto = async (id) => {
    let ret = await getProductosService(id);
    return ret;
}
const actualizarProductosController = async (req, res) => {
    let existe = await existeProducto(req.params.id);

    if (existe.length > 0) {
        actualizaProductoService(req.body, req.params.id)
            .then(rows => {
                res.status(200).send(rows);
            })
    } else {
        res.status(201).send({ message: "No existe producto" });
    }
}

const borrarProductosController = async (req, res) => {
    let existe = await existeProducto(req.params.id);
    if (existe.length > 0) {
        borrarProductoService(req.params.id)
            .then(rows => {
                res.status(200).send(rows);
            })
    } else {
        res.status(201).send({ message: "No existe producto" });
    }
}

const listarProductosController = async (req, res) => {
    let id;
    if (req.params.id !== undefined) id = req.params.id;
    let existe = await existeProducto(req.params.id);

    if (existe.length > 0) {
        getProductosService(id)
            .then(rows => {
                console.log(rows);
                res.status(200).send(rows);
            })
    } else {
        res.status(201).send({ message: "No existe producto" });
    }

}

module.exports = {
    agregarProductosController,
    actualizarProductosController,
    borrarProductosController,
    listarProductosController
}