
const { DaoSqlite3 } = require('../models/modelo.DaoSqlite3');

class ForosDAOsqlite3 extends DaoSqlite3{
    static tabla = 'foros';
    constructor() {
        super(ForosDAOsqlite3.tabla);
    }
}


module.exports = {ForosDAOsqlite3};