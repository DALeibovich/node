
const {DaoArchivo} = require("../modelo.DaoArchivo");
const fs = require('fs');
class ProductosDaoArchivo extends DaoArchivo {
    static tabla = 'productos.json';
    constructor() {
        super(ProductosDaoArchivo.tabla, fs);
    }
}

module.exports = {ProductosDaoArchivo};

/*const ContenedorArchivo = require("../../models/ContenedorArchivo");
const fs = require('fs');
class ProductosDaoArchivo extends ContenedorArchivo{

    constructor(archivo='productos.json'){
        super(archivo,fs);
    }
}

module.exports = ProductosDaoArchivo;*/