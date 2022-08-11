
const { DaoMongoDB } = require('../models/modelo.DaoMongodb');

class ForosDAOmongodb extends DaoMongoDB{
    static tabla = 'foros';
    constructor() {
        super(ForosDAOmongodb.tabla);
    }
}


module.exports = {ForosDAOmongodb};