const { DaoMongoDB } = require("../models/modelo.DaoMongodb");

class ProductosDaoMongoDB extends DaoMongoDB {
    static tabla = 'productos';
    constructor() {
        super(ProductosDaoMongoDB.tabla);
    }
    getByGenero = async (valor, tabla = this.tabla) => {
        let ret;
        
        let query = { genero: {$regex:valor, $options: '-i'} };
        await this.getByCampo(query, tabla)
            .then(res => {
                ret = res;
            })
            .catch(err => {
                console.log("No se pudo ejecutar: " + err.message);
                ret = null;
            })

        return ret || [];
    }

  
    
}

module.exports = {ProductosDaoMongoDB};