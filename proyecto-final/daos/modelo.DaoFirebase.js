const { FirebaseDB } = require("../models/FirebaseDB");
const  firebasedbconn = require('../config/firebase');
class DaoFirebaseDB extends FirebaseDB {
    constructor(tabla = '', conexion='') {
        super(firebasedbconn, tabla, conexion);
    }
    __test = async () => {
       // const test = new DaoFirebaseDB(firebasedbconn,this.tabla);
        await this.getAll()
            .then(res => console.log(`DAO FIREBASE: ${JSON.stringify(res)}`))
            .catch(err => console.log(err))
            //.finally(() => test.desconectar())
    }
}

module.exports = {
    DaoFirebaseDB
};