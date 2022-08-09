
const { DaoMongoDB } = require('../models/modelo.DaoMongodb');

class ProductosDAOmongodb extends DaoMongoDB{
    static tabla = 'foros';
    constructor() {
        super(ProductosDAOmongodb.tabla);
    }
}


module.exports = {ProductosDAOmongodb};