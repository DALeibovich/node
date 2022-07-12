const { DaoMongoDB } = require("../modelo.DaoMongoDB");

class CarritosDaoMongoDB extends DaoMongoDB {
    static tabla = 'carritos';
    constructor() {
        super(CarritosDaoMongoDB.tabla);
    }
}

module.exports = {CarritosDaoMongoDB};