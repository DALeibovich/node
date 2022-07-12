const { KnexDB_SQLite3 } = require("../../models/KnexDB_SQLite3");

class CarritosDaoSqlite3 extends KnexDB_SQLite3 {

    constructor(tabla = 'carritos') {
        super(tabla);
    }
}

module.exports = CarritosDaoSqlite3;