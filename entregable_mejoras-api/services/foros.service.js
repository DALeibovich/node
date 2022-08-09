const { logger } = require('../middlewares/logs')

const {PersistenciaFactoryForos}  = require('../daos/foros/factoryPersistence');
let archivoForos = new PersistenciaFactoryForos();
//let archivoForos2 = new PersistenciaFactoryForos();
// obtenemos todos los productos del archivo
archivoForos.getAll()
    .then(res => logger.info('Mensajes cargados con exito'))
    .catch(err => logger.info(err));


const getMensajesService = async() => {
    return await archivoForos.getAll();
    
}

const agregarMensajesService = async (data) => {
    archivoForos.save(data)
     return archivoForos.arrObjetos;
    
}

module.exports = {
    archivoForos,
    agregarMensajesService,
    getMensajesService
}