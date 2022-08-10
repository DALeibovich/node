
const { DaoMysql } = require('../models/modelo.DaoMysql');

class ForosDAOmysql extends DaoMysql{
    static tabla = 'foros';
    constructor() {
        super(ForosDAOmysql.tabla);
    }
}


module.exports = {ForosDAOmysql};