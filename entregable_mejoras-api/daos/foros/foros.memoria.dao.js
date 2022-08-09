
const { DaoMemoria } = require('../models/modelo.DaoMemoria');

class ForosDAOmemoria extends DaoMemoria{
    static tabla = '';
    constructor() {
        super(ForosDAOmemoria.tabla);
    }
}


module.exports = {ForosDAOmemoria};