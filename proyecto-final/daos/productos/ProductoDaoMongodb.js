const { DaoMongoDB } = require("../models/modelo.DaoMongodb");

class ProductosDaoMongoDB extends DaoMongoDB {
    static tabla = 'productos';
    constructor() {
        super(ProductosDaoMongoDB.tabla);
    }
}

module.exports = {ProductosDaoMongoDB};