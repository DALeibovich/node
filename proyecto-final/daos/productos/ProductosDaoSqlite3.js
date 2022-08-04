const { DaoSqlite3 } = require("../models/modelo.DaoSqlite3");

class ProductosDaoSqlite3 extends DaoSqlite3 {
    static tabla = 'mensajes';
    constructor() {
        super(ProductosDaoSqlite3.tabla);
    }
}

module.exports = ProductosDaoSqlite3;

/*const { KnexDB_SQLite3 } = require("../../models/KnexDB_SQLite3");

class ProductosDaoSqlite3 extends KnexDB_SQLite3 {

    constructor(tabla = 'productos') {
        super(tabla);
    }
}

module.exports = ProductosDaoSqlite3;*/