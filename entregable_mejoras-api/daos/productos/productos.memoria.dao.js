
const { DaoMemoria } = require('../models/modelo.DaoMemoria');

class ProductosDAOmemoria extends DaoMemoria{
    static tabla = '';
    constructor() {
        super(ProductosDAOmemoria.tabla);
    }
}


module.exports = {ProductosDAOmemoria};