const { logger } = require('../middlewares/logs')

//const {PersistenciaFactoryForos}  = require('../daos/foros/factoryPersistence');
const {foros}  = require('../daos/importarClases');
let archivoForos = foros;
//let archivoForos2 = new PersistenciaFactoryForos();
// obtenemos todos los productos del archivo
/*archivoForos.getAll()
    .then(res => logger.info('Mensajes cargados con exito'))
    .catch(err => logger.info(err));
*/

const getMensajesService = async(username='') => {
    let ret;
    if(username === '') {
        ret = await archivoForos.getAll();
    }else{
        ret = await archivoForos.getByUsername(username);
    }
    //console.log('ACA 1');
    //console.log(ret)
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