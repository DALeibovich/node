/****** CONEXION BASE DE DATO MYSQL ************/
//const { db_archivos } = require('../controllers/conexionDB');
//const { generaProductosAleatorio } = require('../controllers/faker');
//const { ProductosFakerDAO } = require('../daos/productos/productos.faker.dao')
const { logger } = require('../middlewares/logs')
//let archivoLibros = db_archivos;


//const { PersistenciaFactoryProductos } = require('../daos/productos/factoryPersistence');
const { productos } = require('../daos/importarClases');
let archivoLibros = productos; //new PersistenciaFactoryProductos();



// obtenemos todos los productos del archivo
/*archivoLibros.getAll()
    .then(res => logger.info('productos cargados con exito'))
    .catch(err => logger.info(err));
*/
// funcion para verificar existencia del producto
existeProducto = async (id) => {
    return await getProductosService(id)

}


const getProductosGeneroService = async (valor) => {
    let ret;
    (valor === undefined) ? ret = await archivoLibros.getAll() : ret = await archivoLibros.getByGenero(valor);
    return ret;
}



const getProductosService = async (id = undefined) => {
    let ret;
    (id === undefined) ? ret = await archivoLibros.getAll() : ret = await archivoLibros.getById(id)
    return ret;
}

const agregarProductosService = async (data) => {
    //console.log(data);
    //archivoLibros.save(data)
    return await archivoLibros.save(data) //getProductosService();

}

//async actualizaArchivo(valor, id) {
const actualizaProductoService = async (objetoNuevo, id) => {
    let ret;
    // verifica existencia del producto
    if ((existeProducto((id)) !== undefined)) {
        await archivoLibros.actualizaArchivo(objetoNuevo, id)
        return objetoNuevo;
    } else {
        ret = [{ error: 'Producto no encontrado' }];
    }
    return ret;
}

// funcion para borrar el producto
const borrarProductoService = async (idp) => {

    let ret;
    // verifica existencia del producto

    if ((existeProducto((idp)) !== undefined)) {
        await archivoLibros.deleteById((idp))
            .then(rows => {
                ret = rows;
            })
            .catch(err => ret = [{ error: err.message }]);
    } else {

        ret = [{ error: 'Producto no encontrado' }];
    }
    return ret;
}

const actualizarStockService = async (id, cantidad) => {
    campo = { stock: cantidad };
    return await archivoLibros.actualizaArchivo(campo, id)

}

module.exports = {
    archivoLibros,
    existeProducto,
    agregarProductosService,
    getProductosService,
    actualizaProductoService,
    borrarProductoService,
    getProductosGeneroService,
    actualizarStockService
}