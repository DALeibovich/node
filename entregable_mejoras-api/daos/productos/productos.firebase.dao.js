
const { DaoFirebaseDB } = require('../models/modelo.DaoFirebase');

class ProductosDAOfirebase extends DaoFirebaseDB{
    static tabla = 'foros';
    constructor() {
        super(ProductosDAOfirebase.tabla);
    }
}


module.exports = {ProductosDAOfirebase};