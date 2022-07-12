const { MongoDB } = require("../models/MongoDB");
const  mongodbconn = require('../config/mongodb');
class DaoMongoDB extends MongoDB {
    constructor(tabla = '') {
          super(mongodbconn,tabla);
    }
    __test = async () => {
        //const test =  new DaoMongoDB(this.tabla);
        await this.getAll()
            .then(res => console.log(`DAO MONGODB: ${JSON.stringify(res)}`))
            .catch(err => console.log(err))
            //.finally(() => test.desconectar())
    }
}

module.exports = {
    DaoMongoDB
};