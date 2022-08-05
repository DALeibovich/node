const { KnexDB } = require('./KnexDB');
const sqliteconn = require('../config/sqlite3');

class KnexDB_SQLite3 extends KnexDB{
    
    constructor(tabla){
        super(sqliteconn, tabla);
    }

}

module.exports = {
    KnexDB_SQLite3
};