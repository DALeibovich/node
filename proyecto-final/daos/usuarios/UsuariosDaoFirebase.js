const { DaoFirebaseDB } = require("../models/modelo.DaoFirebase");

class UsuariosDaoFirebase extends DaoFirebaseDB {
    static tabla = 'users';
    constructor(conexion='') {
        super(UsuariosDaoFirebase.tabla,conexion);
    }
}

module.exports = {UsuariosDaoFirebase};