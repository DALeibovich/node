
// controlador de conexiones a las distintas tablas
const { KnexDB } = require('../models/KnexDB');
const mysqlconn = require('./config/mysql');
const sqliteconn = require('./config/sqlite3');

// conexion a MySQL
const db_mysql = new KnexDB(mysqlconn, 'productos');

// conexion a SQLite3
const db_sqlite = new KnexDB(sqliteconn, 'mensajes');


module.exports = {
    db_mysql,
    db_sqlite
}

