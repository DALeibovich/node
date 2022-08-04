const { DaoMysql } = require("../models/modelo.DaoMysql");

class ProductosDaoMysql extends DaoMysql {
    static tabla = 'productos';
    constructor() {
        super(ProductosDaoMysql.tabla);
    }
}

module.exports = ProductosDaoMysql;

/*const { KnexDB_MySql } = require("../../models/KnexDB_MySql");

class ProductosDaoMysql extends KnexDB_MySql {
    constructor(tabla = 'productos') {
        super(tabla);
    }
}

module.exports = ProductosDaoMysql;
*/

