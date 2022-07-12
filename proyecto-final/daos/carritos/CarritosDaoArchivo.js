
const {DaoArchivo} = require("../modelo.DaoArchivo");
const fs = require('fs');
class CarritosDaoArchivo extends DaoArchivo {
    static tabla = 'carritos.json';
    constructor() {
        super(CarritosDaoArchivo.tabla, fs);
    }
}

module.exports = {CarritosDaoArchivo};