
const { DaoSqlite3 } = require('../models/modelo.DaoSqlite3');

class ProductosDAOsqlite3 extends DaoSqlite3{
    static tabla = 'productos';
    constructor() {
        super(ProductosDAOsqlite3.tabla);
    }
}


module.exports = {ProductosDAOsqlite3};