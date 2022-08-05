//import { faker } from '@faker-js/faker';
const { FakerDAO } = require('./models/modelo.DaoFaker');

class ProductosFakerDAO extends FakerDAO{
    constructor(limite=15, objeto='') {
        super(objeto,limite);
    }
}

/*
class ProductosDaoFirebase extends DaoFirebaseDB {
    static tabla = 'productos';
    constructor(conexion='') {
        super(ProductosDaoFirebase.tabla,conexion='');
    }
}*/

module.exports = {ProductosFakerDAO};