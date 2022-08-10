
const { DaoArchivo } = require('../models/modelo.DaoArchivo');

class ProductosDAOarchivo extends DaoArchivo{
    static tabla = 'productos.json';
    constructor() {
        super(ProductosDAOarchivo.tabla);
    }
}


module.exports = {ProductosDAOarchivo};