const { KnexDB_SQLite3 } = require("../models/KnexDB_SQLite3");

class DaoSqlite3 extends KnexDB_SQLite3 {

    constructor(tabla = 'productos') {
        super(tabla);
    }
    __test = async () => {
        const test = new DaoSqlite3(this.tabla);
        await test.getAll()
            .then(res => console.log(`DAO SQLITE3: ${JSON.stringify(res)}`))
            .catch(err => console.log(err))
            .finally(() => test.desconectar())
    }
}

module.exports = {
    DaoSqlite3
};