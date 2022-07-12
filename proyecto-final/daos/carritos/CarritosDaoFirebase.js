const { DaoFirebaseDB } = require("../modelo.DaoFirebase");

class CarritosDaoFirebase extends DaoFirebaseDB {
    static tabla = 'carritos';
    constructor(conexion='') {
        super(CarritosDaoFirebase.tabla,conexion);
    }
}

module.exports = {CarritosDaoFirebase};