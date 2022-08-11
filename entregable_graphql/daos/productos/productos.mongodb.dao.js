
const { DaoMongoDB } = require('../models/modelo.DaoMongodb');

class ProductosDAOmongodb extends DaoMongoDB{
    static tabla = 'productos';
    constructor() {
        super(ProductosDAOmongodb.tabla);
    }
}


module.exports = {ProductosDAOmongodb};