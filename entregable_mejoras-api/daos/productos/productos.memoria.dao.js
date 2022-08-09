
const { DaoMemoria } = require('../models/modelo.DaoMemoria');

class ProductosDAOmemoria extends DaoMemoria{
    static tabla = 'productos';
    constructor() {
        super(ProductosDAOmemoria.tabla);
    }
}


module.exports = {ProductosDAOmemoria};