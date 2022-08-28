const { DaoMongoDB } = require("../models/modelo.DaoMongodb");

class ForosDaoMongoDB extends DaoMongoDB {
    static tabla = 'foros';
    constructor() {
      
        super(ForosDaoMongoDB.tabla);
    }
   /* getByUsername = async (username) => {
        console.log(username);
        let ret = await this.getByCampo({"author.id":username})
        return ret
    }
*/

    getByUsername = async (valor) => {
        let ret;
        
       // let query = {"author.id":valor};
        let query = {"q":valor};
        await this.getByCampo(query)
            .then(res => {
                ret = res;
            })
            .catch(err => {
                console.log("No se pudo ejecutar: " + err.message);
                ret = null;
            })

        return ret;
    }
}

module.exports = {
    ForosDaoMongoDB
};