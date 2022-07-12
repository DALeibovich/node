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
        table.string('decripcion')
        table.string('codigo')
        table.integer('stock')
        table.integer('timestamp')
    })
        .then(() => console.log('Tabla Productos creada con exito'))
        .catch(err => console.log(err.sqlMessage))
}

// Crea la tabla de carritos en MySQL
const crearTablaCarrito = async () => {
    await db_mysql.knexConexion.schema.createTable('carritos', table => {
        table.increments('id').primary()
        table.string('idHash')   
        table.integer('timestamp')
        table.json('prodcutos')
    })
        .then(() => console.log('Tabla carritos creada con exito'))
        .catch(err => console.log(err.sqlMessage))
}

// crea las tablas necesarias

crearTablaProducto();
crearTablaCarrito();

