const { DaoFirebaseDB } = require("../modelo.DaoFirebase");

class ProductosDaoFirebase extends DaoFirebaseDB {
    static tabla = 'productos';
    constructor(conexion='') {
        super(ProductosDaoFirebase.tabla,conexion='');
    }
}

module.exports = {ProductosDaoFirebase};