
const { DaoMysql } = require('../models/modelo.DaoMysql');

class ProductosDAOmysql extends DaoMysql{
    static tabla = 'productos';
    constructor() {
        super(ProductosDAOmysql.tabla);
    }
}


module.exports = {ProductosDAOmysql};