const winston = require('winston')

const filtroError = winston.format((info, opts) => {
    return info.level === 'error' ? info : false;
  });
  
  const filtroWarn = winston.format((info, opts) => {
    return info.level === 'warn' ? info : false;
  });

const createLogger = (env) => {
    if (env === 'PROD') {

        return winston.createLogger({
            level: 'info',
            transports: [
                new winston.transports.Console({ level: "info" }),
                new winston.transports.File({filename: './logs/warn.log', level: "warn", format: filtroWarn() }),
                new winston.transports.File({filename: './logs/error.log', level: "error", format: filtroError() })
            ]
        })
    } else {
        return winston.createLogger({
            transports: [
                new winston.transports.Console({ level: "info" })
            ]
        })
    }

}

module.exports = {createLogger}