const { persistencia } = require('../../config/config');

class PersistenciaFactoryForos {
    static app = null;
    constructor() {
        let persistence = persistencia();
        if (PersistenciaFactoryForos.app !== null) console.log('SINGLETON')
        switch (persistence) {
            case 'ARRAY':
                let { ForosDAOmemoria } = require('./foros.memoria.dao');
                if (PersistenciaFactoryForos.app === null) PersistenciaFactoryForos.app = new ForosDAOmemoria();
            //return PersistenciaFactoryForos.app;

            case 'MONGO':
                let { ForosDAOmongodb } = require('./foros.mongodb.dao');
                if (PersistenciaFactoryForos.app === null) PersistenciaFactoryForos.app = new ForosDAOmongodb();
            //return PersistenciaFactoryForos.app;

            case 'FIREBASE':
                let { ForosDAOfirebase } = require('./foros.firebase.dao');
                if (PersistenciaFactoryForos.app === null) PersistenciaFactoryForos.app = new ForosDAOfirebase();
            //return PersistenciaFactoryForos.app;

            case 'MYSQL':
                let { ForosDAOmysql } = require('./foros.mysql.dao');
                if (PersistenciaFactoryForos.app === null) PersistenciaFactoryForos.app = new ForosDAOmysql();
            //return PersistenciaFactoryForos.app;

            case 'SQLITE3':
                let { ForosDAOsqlite3 } = require('./foros.sqlite3.dao');
                if (PersistenciaFactoryForos.app === null) PersistenciaFactoryForos.app = new ForosDAOsqlite3();
            //return PersistenciaFactoryForos.app;

            default: // FILE DEFAULT
                let { ForosDAOarchivo } = require('./foros.archivo.dao');
                if (PersistenciaFactoryForos.app === null) PersistenciaFactoryForos.app = new ForosDAOarchivo();
            //return PersistenciaFactoryForos.app;


        }
        return PersistenciaFactoryForos.app;
    }

}


module.exports = { PersistenciaFactoryForos }