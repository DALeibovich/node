
const { DaoFirebaseDB } = require('../models/modelo.DaoFirebase');

class ProductosDAOfirebase extends DaoFirebaseDB{
    static tabla = 'productos';
    constructor() {
        super(ProductosDAOfirebase.tabla);
    }
}


module.exports = {ProductosDAOfirebase};