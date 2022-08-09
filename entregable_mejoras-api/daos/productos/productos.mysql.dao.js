
const { DaoMysql } = require('../models/modelo.DaoMysql');

class ProductosDAOmysql extends DaoMysql{
    static tabla = 'foros';
    constructor() {
        super(ProductosDAOmysql.tabla);
    }
}


module.exports = {ProductosDAOmysql};