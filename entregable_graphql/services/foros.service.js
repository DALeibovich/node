const { logger } = require('../middlewares/logs')

const {PersistenciaFactoryForos}  = require('../daos/foros/factoryPersistence');
let archivoForos = new PersistenciaFactoryForos();
//let archivoForos2 = new PersistenciaFactoryForos();
// obtenemos todos los productos del archivo
archivoForos.getAll()
    .then(res => logger.info('Mensajes cargados con exito'))
    .catch(err => logger.info(err));


const getMensajesService = async() => {
    let ret;
    ret = await archivoForos.getAll();
    console.log(ret)
    return ret;
    
}

const agregarMensajesService = async (data) => {
   // data.objectAssign({fecha: Date.now()})
   let objetoNuevo = Object.assign({ fecha: Date.now() }, data);
    
    archivoForos.save(objetoNuevo)
    let ret;
    ret = await archivoForos.getAll();
    return ret;
    
    
}

module.exports = {
    archivoForos,
    agregarMensajesService,
    getMensajesService
}