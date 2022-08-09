
const { DaoArchivo } = require('../models/modelo.DaoArchivo');

class ForosDAOarchivo extends DaoArchivo{
    static tabla = 'foros.json';
    constructor() {
        super(ForosDAOarchivo.tabla);
    }
}


module.exports = {ForosDAOarchivo};