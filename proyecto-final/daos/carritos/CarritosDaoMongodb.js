const { DaoMongoDB } = require("../models/modelo.DaoMongodb");

class CarritosDaoMongoDB extends DaoMongoDB {
    static tabla = 'carritos';
    constructor() {
        super(CarritosDaoMongoDB.tabla);
    }
}

module.exports = {CarritosDaoMongoDB};