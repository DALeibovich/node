
const { KnexDB_MySql } = require("../models/KnexDB_MySql");

class DaoMysql extends KnexDB_MySql {
    constructor(tabla = 'productos') {
        super(tabla);
    }
    __test = async () => {
        const test = new DaoMysql(this.tabla);
        await test.getAll()
            .then(res => console.log(`DAO MYSQL: ${JSON.stringify(res)}`))
            .catch(err => console.log(err))
            .finally(() => test.desconectar())
    }
}

module.exports = {
    DaoMysql
};