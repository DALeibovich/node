const { DaoMongoDB } = require("../modelo.DaoMongoDB");

class ProductosDaoMongoDB extends DaoMongoDB {
    static tabla = 'productos';
    constructor() {
        super(ProductosDaoMongoDB.tabla);
    }
}

module.exports = {ProductosDaoMongoDB};