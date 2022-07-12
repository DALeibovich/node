/****** IMPORTAMOS CLASES DAOS CON CONEXION  ************/
const { productos } = require('../daos/importarClases');
const archivoLibros = productos;

const Producto = require('../models/Productos');


/****** CONEXION BASE DE DATO EN MEMORIA ************/
//const { db_memoria } = require('./conexionDB');
//let archivoLibros = db_memoria;

/****** CONEXION BASE DE DATO EN ARCHIVO ************/
//const { db_archivo } = require('./conexionDB');
//let archivoLibros = db_archivo;

/****** CONEXION BASE DE DATO MYSQL ************/
//const { db_mysql } = require('./conexionDB');
//let archivoLibros = db_mysql;

/****** CONEXION BASE DE DATO SQLITE3 ************/
//const { db_sqlite } = require('./conexionDB');
//let archivoLibros = db_sqlite;

/****** CONEXION BASE DE DATO MONGODB  ************/
//const { db_mongodb } = require('./conexionDB');
//const archivoLibros = db_mongodb;

/****** CONEXION BASE DE DATO FIREBASE  ************/
//const  {db_firebasedb}  = require('./conexionDB');
//const  archivoLibros = db_firebasedb;

// obtenemos todos los productos del archivo o por ID
const listarProductos = async (id = '') => {
    console.log(archivoLibros.getAll())
    let ret;
    if (id == '') {
        ret = await archivoLibros.getAll()
            .then(rows => { return rows })
            .catch(err => console.log(err));
    } else {
        ret = await archivoLibros.getById(id)
            .then(rows => { return rows })
            .catch(err => console.log(err));
    }
    return ret;
}
// funcion para verificar existencia del producto
const existeProducto = async (id) => {
    let ret;
    await archivoLibros.getById((id))
        .then(response => {
            ret = response;
        })
    return ret;
}

const actualizaProducto = async (objeto, id) => {

    let { nombre, autor, precio, foto, descripcion, codigo, stock } = objeto;
    let timestamp = Date.now();
    let objetoNuevo = { nombre, autor, precio, foto, descripcion, codigo, stock, timestamp };
    let ret;
    await archivoLibros.actualizaArchivo(objetoNuevo, id)
        .then((rows) => {
            ret = rows;
        })
    return ret;
}

// funcion para borrar el producto
async function borrarProducto(idp) {

    let ret;
    // verifica existencia del producto  
    await archivoLibros.deleteById((idp))
        .then(response => {
            ret = response;
        })

    return ret;
}

// funcion para agregar un producto 
const nuevoProducto = async (obj) => {

    let ultimo = await archivoLibros.ultimoId() ?? 0;
    const { nombre, autor, foto, precio, descripcion, codigo, stock } = obj;
    let producto = new Producto(parseInt(ultimo) + 1, nombre, autor, foto, precio, descripcion, codigo, stock);

    await archivoLibros.save(obj)
        .then(response => {
            ret = response;
        })

    return ret;
}


// Funciona para escribir un archivo
async function escribirArchivo(nombrearchivo) {

    let ret = [{ estado: 'No se pudo guardar' }];
    try {

        await fs.promises.writeFile('./DB/' + nombrearchivo, JSON.stringify(archivoLibros.arrObjetos, null, 2))
            .then(response => {
                ret = [{ estado: 'Guardado con exito' }]

            });
        return ret;
    } catch (err) {
        console.log(err);
        return ret;
    }

}

module.exports = {
    archivoLibros,
    borrarProducto,
    actualizaProducto,
    existeProducto,
    escribirArchivo,
    nuevoProducto,
    listarProductos
}