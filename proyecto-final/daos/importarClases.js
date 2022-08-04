require('dotenv').config();
let productos;
let carritos;
let usuariosDB;

// DAO ARCHiVOS
if (process.env.DB_ENGINE === 'archivo') {
    const { ProductosDaoArchivo } = require('./productos/ProductosDaoArchivo');
    let productosArchivos = new ProductosDaoArchivo();
    productosArchivos.__test(); // __test(); es una funcion de ./modelo.DaoArchivo
    productos = productosArchivos;

    const { CarritosDaoArchivo } = require('./carritos/CarritosDaoArchivo');
    let carritosArchivos = new CarritosDaoArchivo();
    carritos = carritosArchivos;
}

// DAO MEMORIA
if (process.env.DB_ENGINE === 'memoria') {
    const { ProductosDaoMemoria } = require('./productos/ProductosDaoMemoria');
    let productosMemoria = new ProductosDaoMemoria();
    productosArchivos.__test(); // __test(); es una funcion de ./modelo.DaoArchivo
    productos = productosMemoria;
}
// DAO MYSQL
if (process.env.DB_ENGINE === 'mysql') {
    const ProductosDaoMysql = require('./productos/ProductosDaoMysql');
    let productosMysql = new ProductosDaoMysql();
    productosMysql.__test(); // __test(); es una funcion de ./modelo.DaoMysql.js
    productos = productosMysql;

    const { CarritosDaoMysql } = require('./carritos/CarritosDaoMysql');
    let carritosMysql = new CarritosDaoMysql();
    carritos = carritosMysql;
}

// DAO SQLITE3
if (process.env.DB_ENGINE === 'sqlite3') {
    const ProductosDaoSqlite3 = require('./productos/ProductosDaoSqlite3');
    let productosSqlite3 = new ProductosDaoSqlite3();
    productosSqlite3.__test(); // __test(); es una funcion de ./modelo.DaoSqlite3.js
    productos = productosSqlite3;
}
// DAO MONGODB
if (process.env.DB_ENGINE === 'mongodb') {
    const { ProductosDaoMongoDB } = require('./productos/ProductoDaoMongodb');
    let productosMongoDB = new ProductosDaoMongoDB();
    //setTimeout(() => productosMongoDB.__test(), 10000); // __test(); es una funcion de ./modelo.DaoMongodb.js
    productos = productosMongoDB;

    const { CarritosDaoMongoDB } = require('./carritos/CarritosDaoMongodb');
    let carritosMongoDB = new CarritosDaoMongoDB();
    carritos = carritosMongoDB;

    const { UsuariosDaoMongoDB } = require('./usuarios/UsuariosDaoMongodb');
    let usuariosMongoDB = new UsuariosDaoMongoDB();
    //usuariosMongoDB.conectar();
    setTimeout(() => usuariosMongoDB.__test(), 10000);
    usuariosDB = usuariosMongoDB;
}
// DAO FIREBASE
if (process.env.DB_ENGINE === 'firebase') {
    const { ProductosDaoFirebase } = require('./productos/ProductoDaoFirebase');
    let productosFirebase = new ProductosDaoFirebase();
    productosFirebase.__test(); // __test(); es una funcion de ./modelo.DaoFirebase.js
    productos = productosFirebase;

    const { CarritosDaoFirebase } = require('./carritos/CarritosDaoFirebase');
    let carritosFirebase = new CarritosDaoFirebase(productosFirebase.firebaseCliente);
    carritos = carritosFirebase;
}


module.exports = {
    productos,
    carritos,
    usuariosDB
};