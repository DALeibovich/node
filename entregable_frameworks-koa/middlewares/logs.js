const express = require('express');
const {createLogger} = require('../utils/winston.js')
const logger = createLogger('PROD');
require('dotenv/config')
const core = require('os');
// creamos el ruteo de la api 
const { Router } = express;
const routerLogger = Router();

// logs de metodos y path
routerLogger.use('/',(req, res, next) => {
    logger.info(`${ Date()} | ${req.method} ${req.path}`)
    next();
})



const logsErrores = (error,req, res, next) => {
    logger.error(`${ Date()} | ${error.code} ${error.message}`)
    next();
}

const logsWarns = (req, res, next) => {
    logger.warn(`${ Date()} |  ${req.method} en ${req.path} no implementado.`)
    next();
}


const logsProcess = (req, res, next) => {
    
    logger.info(`Cantidad de CPU-core: ${core.cpus().length} core | Argumentos de entrada:  ${process.argv} |  Path de ejecución:  ${process.cwd()} |  Nombre de la plataforma:  ${process.platform} / ${process.arch} | Process id:  ${process.pid} |  Versión de node.js:  ${process.version} |  Memoria total reservada (rss):  ${process.memoryUsage().rss} bytes`)
    next();
}

// logs de errores y path no encontrados
routerLogger.use('/api/productos', logsErrores);
routerLogger.use('/productos', logsErrores);
routerLogger.get('/info', logsProcess)
// logs de metodos y path no encontrados
routerLogger.use(logsWarns)


// redefinimos los "console" por si en el codigo fuente quedo un console.log
console.log = function(){
    return logger.info.apply(logger, arguments)
  }
  console.error = function(){
    return logger.error.apply(logger, arguments)
  }
  console.info = function(){
    return logger.warn.apply(logger, arguments)
  }

module.exports = {
    routerLogger,
    logger
};