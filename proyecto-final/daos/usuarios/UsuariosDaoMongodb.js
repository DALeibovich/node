const { DaoMongoDB } = require("../models/modelo.DaoMongodb");

class UsuariosDaoMongoDB extends DaoMongoDB {
    static tabla = 'users';
    constructor() {
      
        super(UsuariosDaoMongoDB.tabla);
    }

    existeEmail(email) {
       let user = this.getByCampo({email: email})
       if(user) return true;
    }

    existeUsername(username) {
        let user = this.getByCampo({username: username})
        if(user) return true;
     }
}

module.exports = {UsuariosDaoMongoDB};