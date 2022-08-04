const { KnexDB_SQLite3 } = require("../../models/KnexDB_SQLite3");

class UsuariosDaoSqlite3 extends KnexDB_SQLite3 {

    constructor(tabla = 'users') {
        super(tabla);
    }
}

module.exports = UsuariosDaoSqlite3;