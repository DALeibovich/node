const { DaoFirebaseDB } = require("../models/modelo.DaoFirebase");

class ProductosDaoFirebase extends DaoFirebaseDB {
    static tabla = 'productos';
    constructor(conexion='') {
        super(ProductosDaoFirebase.tabla,conexion='');
    }
}

module.exports = {ProductosDaoFirebase};