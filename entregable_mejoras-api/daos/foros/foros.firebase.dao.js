
const { DaoFirebaseDB } = require('../models/modelo.DaoFirebase');

class ForosDAO extends DaoFirebaseDB{
    static tabla = 'foros';
    constructor() {
        super(ForosDAO.tabla);
    }
}


module.exports = {ForosDAO};