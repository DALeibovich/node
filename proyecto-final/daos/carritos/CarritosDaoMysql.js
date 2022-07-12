
const { KnexDB_MySql } = require("../../models/KnexDB_MySql");

class CarritosDaoMysql extends KnexDB_MySql {
    constructor(tabla = 'carritos') {
        super(tabla);
    }
}

module.exports = {CarritosDaoMysql};