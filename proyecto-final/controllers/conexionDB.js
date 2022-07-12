
// controlador de conexiones a las distintas tablas

const {ContenedorArchivo} = require('../models/ContenedorArchivo');
const {ContenedorMemoria} = require('../models/ContenedorMemoria');
const { KnexDB } = require('../models/KnexDB');
const { MongoDB } = require('../models/MongoDB');
const { FirebaseDB } = require('../models/FirebaseDB');
const mysqlconn = require('../config/mysql');
const sqliteconn = require('../config/sqlite3');
const mongodbconn = require('../config/mongodb');
const firebaseconn = require('../config/firebase');


// conexion a Archivos json
const db_archivo = new ContenedorArchivo('productos.json');

// conexion a Memoria
const db_memoria = new ContenedorMemoria();

// conexion a MySQL
const db_mysql = new KnexDB(mysqlconn, 'productos');

// conexion a SQLite3
const db_sqlite = new KnexDB(sqliteconn, 'productos');

// conexion a MONGODB Atlas
const db_mongodb =  new MongoDB(mongodbconn, 'productos');
 
// conexion a FIRESTORE de FIrebase
const db_firebasedb = new FirebaseDB(firebaseconn, 'productos');

module.exports = {
    db_archivo,
    db_memoria,
    db_mysql,
    db_sqlite,
    db_firebasedb,
    db_mongodb
}

