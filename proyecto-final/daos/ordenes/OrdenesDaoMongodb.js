const { DaoMongoDB } = require("../models/modelo.DaoMongodb");

class OrdenesDaoMongodb extends DaoMongoDB {
    static tabla = 'ordenes';
    constructor() {
      
        super(OrdenesDaoMongodb.tabla);
    }
   

    getByCliente = async (valor) => {
        let ret;
        
       // let query = {"author.id":valor};
        let query = {"cliente.id":valor};
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
    OrdenesDaoMongodb
};