
// controlador de conexiones a las distintas tablas
const { KnexDB } = require('../models/KnexDB');
const mysqlconn = require('./config/mysql');
const sqliteconn = require('./config/sqlite3');
const mongodbconn = require('./config/mongodb');

const fs = require('fs');
const Contenedor = require('../models/Contenedor');
const nombreArchivo = 'productos.txt';
const db_archivos = new Contenedor(nombreArchivo, fs);

// conexion a MySQL
//const db_mysql = new KnexDB(mysqlconn, 'productos');

// conexion a SQLite3
//const db_sqlite = new KnexDB(sqliteconn, 'mensajes');

// conexion a Contenedor Mongo DB
const { MongoDB } = require('../models/MongoDB');
db_mongodb = new MongoDB(mongodbconn, 'usuarios');

module.exports = {
   // db_mysql,
    //db_sqlite,
    db_mongodb,
    db_archivos
}

