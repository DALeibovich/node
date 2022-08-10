const { KnexDB } = require('./KnexDB');
const  mysqlconn = require('../config/mysql');
class KnexDB_MySql extends KnexDB{
   
    constructor(tabla){
        super(mysqlconn, tabla);
      
    }

}

module.exports = {
    KnexDB_MySql
};