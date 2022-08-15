/****** CONEXION BASE DE DATO MYSQL ************/
//const { db_archivos } = require('../controllers/conexionDB');
//const { generaProductosAleatorio } = require('../controllers/faker');
const { ProductosFakerDAO } = require('../daos/productos/productos.faker.dao')
const { logger } = require('../middlewares/logs')
//let archivoLibros = db_archivos;


const { PersistenciaFactoryProductos } = require('../daos/productos/factoryPersistence');
let archivoLibros = new PersistenciaFactoryProductos();


const fakerProductosService = (limite) => {
    // return generaProductosAleatorio(limite);
    return new ProductosFakerDAO(limite);
}


// obtenemos todos los productos del archivo
archivoLibros.getAll()
    .then(res => logger.info('productos cargados con exito'))
    .catch(err => logger.info(err));

// funcion para verificar existencia del producto
function existeProducto(id) {
    let arr = [...archivoLibros.arrObjetos];
    let objeto = arr.find((obj) => obj.id == id);
    return objeto;
}



const getProductosService = async () => {
    let ret;
    ret = await archivoLibros.getAll()
    return ret;
}

const agregarProductosService = async (data) => {
    console.log(data);
    archivoLibros.save(data)    
    return await  archivoLibros.save(data) //getProductosService();

}

//async actualizaArchivo(valor, id) {
const actualizaProductoService = async (objetoNuevo, id) => {
    let ret;
    // verifica existencia del producto
    if ((existeProducto(parseInt(id)) !== undefined)) {
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
    
    if ((existeProducto(parseInt(idp)) !== undefined)) {
        await archivoLibros.deleteById(parseInt(idp))
            .then(rows => {
                ret = rows;
            })
            .catch(err => ret = [{ error: err.message }]);
    } else {

        ret = [{ error: 'Producto no encontrado' }];
    }
    return ret;
}


module.exports = {
    archivoLibros,
    existeProducto,
    fakerProductosService,
    agregarProductosService,
    getProductosService,
    actualizaProductoService,
    borrarProductoService
}