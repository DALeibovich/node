
const {ContenedorArchivo} = require("../../models/ContenedorArchivo");
const fs = require('fs');

class DaoArchivo extends ContenedorArchivo {

    constructor(archivo = 'productos.json') {
        super(archivo, fs);
    }
    __test = async () => {
        const test = new DaoArchivo('productos.json');
        await test.getAll()
            .then(res => console.log(`DAO ARCHIVO: ${JSON.stringify(res)}`))
            .catch(err => console.log(err))

    }

}

module.exports = {
    DaoArchivo
};