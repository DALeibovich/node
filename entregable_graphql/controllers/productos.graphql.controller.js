const { fakerProductosService, agregarProductosService, getProductosService, actualizaProductoService, borrarProductoService } = require('../services/productos.service')
const { productoSchema } = require('./graphql/productos.schema');
const { graphql } = require('graphql');


const rootProducto = {
    getProductos: () => getProductosService(),
    getProductoById: (data) => getProductosService(data.id),
    addProducto: (data) => agregarProductosService(data),
    updateProducto: (data) => actualizaProductoService(data, data.id),
    deleteProducto: (data) => borrarProductoService(data.id)
}



const queryGetProductos = async (req, res) => {
    let ret = await graphql(productoSchema, `query {
    getProductos {
     id,
     nombre,
     autor,
     precio,
     foto,
     agregadoPor
    }
   }`, rootProducto);
    res.send(ret.data.getProductos);
}


const queryGetProductosById = async (req, res) => {
    let ret = await graphql(productoSchema, `query {
    getProductoById (id: ${req.params.id}){
        id,
        nombre,
        autor,
        precio,
        foto,
        agregadoPor
    }
   }`, rootProducto);
    res.send(ret.data.getProductoById);
}


const mutationAddProductos = async (req, res) => {
    try{
    let ret = await graphql(productoSchema, `mutation {
     addProducto (nombre: "${req.body.nombre}", autor: "${req.body.autor}", precio: ${req.body.precio}, foto: "${req.body.foto}", agregadoPor: "${req.body.agregadoPor}")
     {
        id,
        nombre,
        autor,
        precio,
        foto,
        agregadoPor
    }
   }`, rootProducto);
    res.status(200).send(ret.data.addProducto);
}catch (err){
    console.error(err);
}
}


const mutationUpdateProductos = async (req, res) => {
    let ret = await graphql(productoSchema, `mutation {
    updateProducto(id: ${req.params.id}, nombre: "${req.body.nombre}", autor: "${req.body.autor}", precio: ${req.body.precio}, foto: "${req.body.foto}", agregadoPor: "${req.body.agregadoPor}")
    {
     id,
     nombre,
     autor,
     precio,
     foto,
     agregadoPor
    }
   }`, rootProducto);

    res.status(200).send(ret.data.updateProducto);
}

const mutationDeleteProductos = async (req, res) => {
    let ret = await graphql(productoSchema, `mutation {
    deleteProducto (id: ${req.params.id}){
        id,
        nombre,
        autor,
        precio,
        foto,
        agregadoPor
    }
   }`, rootProducto);
    res.send(ret.data.deleteProducto);
}

module.exports = {
    productoSchema,
    rootProducto,
    queryGetProductos,
    queryGetProductosById,
    mutationAddProductos, mutationUpdateProductos, mutationDeleteProductos
}