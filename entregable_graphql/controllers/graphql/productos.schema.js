const  { buildSchema } = require('graphql');

let productoSchema = buildSchema(`
    type Producto {
        id: Int,
        _id: String
        nombre: String
        autor: String
        precio: Float
        foto: String
        agregadoPor: String

    }
    type Query {
        getProductos: [Producto]
        getProductoById(id:Int): Producto
    }
    type Mutation {
        addProducto(nombre: String, autor: String, precio: Float, foto: String, agregadoPor: String): Producto
        updateProducto(id: Int, nombre: String, autor: String, precio: Float, foto: String, agregadoPor: String): Producto
        deleteProducto(id: Int): [Producto]
    }
`)

module.exports = {productoSchema};