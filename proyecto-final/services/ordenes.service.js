const { logger } = require('../middlewares/logs')

//const { PersistenciaFactoryOrdenes } = require('../daos/ordenes/factoryPersistence');
//let containerOrdenes = new PersistenciaFactoryOrdenes();

const {ordenes}  = require('../daos/importarClases');
let containerOrdenes = ordenes; //new PersistenciaFactoryProductos();

/*containerOrdenes.getAll()
    .then(res => logger.info('Ordenes cargadas con exito'))
    .catch(err => logger.info(err));
*/

    existeOrdenes = async (id) => {
        return await getOrdenesService(id)
        
    }
    


const getOrdenesService = async (id = '') => {
    let ret;
    if (id === '') ret = await containerOrdenes.getAll();
    else ret = await containerOrdenes.getById(id);
    return ret;

}


const agregarOrdenesService = async (data) => {

    return await containerOrdenes.save(data);

}

const getOrdenesClienteService = async (cliente = '') => {
    let ret;
    if (cliente === '') ret = await containerOrdenes.getAll();
    else ret = await containerOrdenes.getByCliente(cliente);
    return ret;
}


module.exports = {
    containerOrdenes,
    getOrdenesService,
    getOrdenesClienteService,
    agregarOrdenesService,
    existeOrdenes

}