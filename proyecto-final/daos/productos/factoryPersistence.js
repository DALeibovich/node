const { persistencia } = require('../../config/config');

class PersistenciaFactoryProductos {
    static app = null;
    constructor() {
        let persistence = persistencia();
        if (PersistenciaFactoryProductos.app !== null) console.log('SINGLETON')
        switch (persistence) {
            case 'ARRAY':
                let { ProductosDAOmemoria } = require('./productos.memoria.dao');
                if (PersistenciaFactoryProductos.app === null) PersistenciaFactoryProductos.app = new ProductosDAOmemoria();

            case 'FILE':
                let { ProductosDAOarchivo } = require('./productos.archivo.dao');
                return new ProductosDAOarchivo();

            case 'MONGO':
                let { ProductosDAOmongodb } = require('./productos.mongodb.dao');
                if (PersistenciaFactoryProductos.app === null) PersistenciaFactoryProductos.app = new ProductosDAOmongodb();

            case 'FIREBASE':
                let { ProductosDAOfirebase } = require('./productos.firebase.dao');
                if (PersistenciaFactoryProductos.app === null) PersistenciaFactoryProductos.app = new ProductosDAOfirebase();

            case 'MYSQL':
                let { ProductosDAOmysql } = require('./productos.mysql.dao');
                if (PersistenciaFactoryProductos.app === null) PersistenciaFactoryProductos.app = new ProductosDAOmysql();

            case 'SQLITE3':
                let { ProductosDAOsqlite3 } = require('./productos.sqlite3.dao');
                if (PersistenciaFactoryProductos.app === null) PersistenciaFactoryProductos.app = new ProductosDAOsqlite3();

            /*case 'FAKER':
                let { ProductosDAOfaker } = require('./productos.faker.dao');
                if (PersistenciaFactoryProductos.app === null) PersistenciaFactoryProductos.app = new ProductosDAOfaker();
            */
            default: // FILE POR DEFAULT
                //let { ProductosDAOmongodb } = require('./productos.mongodb.dao');
                //if (PersistenciaFactoryProductos.app === null) PersistenciaFactoryProductos.app = new ProductosDAOmongodb();

        }

        return PersistenciaFactoryProductos.app;
    }

}


module.exports = { PersistenciaFactoryProductos }