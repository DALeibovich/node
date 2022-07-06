const { db_mysql, db_sqlite } = require('./controllers/conexionDB');

// Crea la tabla de productos en MySQL
const crearTablaProducto = async () => {
    await db_mysql.knexConexion.schema.createTable('productos', table => {
        table.increments('id').primary()
        table.string('nombre')
        table.string('autor')
        table.double('precio', 4, 2)
        table.string('foto')
        table.string('agregadoPor')
    })
        .then(() => console.log('Tabla Productos creada con exito'))
        .catch(err => console.log(err.sqlMessage))
}

// Crea la tabla de mensajes en SQLite3 y mete el mensaje de bienvenida 
const crearTablaMensajes = async () => {
    await db_sqlite.knexConexion.schema.createTable('mensajes', table => {
        table.increments('id').primary().notNull(),
            table.string('msg', 250).notNull(),
            table.integer('fecha').notNull(),
            table.string('agregadoPor', 100).notNull()
    })
        .then(() => {
            console.log('Tabla Mensaje creada con exito');
            let primerRegistro = {
                msg: 'Bienvenido...',
                fecha: Date.now(),
                agregadoPor: 'daleibovich@teco.com.ar'
            };
            db_sqlite.save(primerRegistro)
        })
        .catch(err => console.log(err.sqlMessage))
}

// crea las tablas necesarias
crearTablaMensajes();
crearTablaProducto();

