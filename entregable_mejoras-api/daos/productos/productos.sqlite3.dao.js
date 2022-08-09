
const { DaoSqlite3 } = require('../models/modelo.DaoSqlite3');

class ProductosDAOsqlite3 extends DaoSqlite3{
    static tabla = 'foros';
    constructor() {
        super(ProductosDAOsqlite3.tabla);
    }
}


module.exports = {ProductosDAOsqlite3};