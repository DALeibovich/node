
const { KnexDB_MySql } = require("../../models/KnexDB_MySql");

class UsuariosDaoMysql extends KnexDB_MySql {
    constructor(tabla = 'users') {
        super(tabla);
    }
}

module.exports = {UsuariosDaoMysql};