/****** IMPORTAMOS CLASES DAOS CON CONEXION  ************/
const { carritos } = require('../daos/importarClases');
const archivoCarritos = carritos;

const { archivoLibros } = require('./productos');
// obtenemos todos los productos del archivo
const {Carrito} = require('../models/Carrito');

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


/*
archivoCarritos.getAll(Carrito)
    .then(res => {
        console.log('Carritos cargados con exito')
    })
    .catch(err => console.log(err));
*/

const nuevoCarrito = async (obj) => {
   
    let ultimo =  await archivoCarritos.ultimoId() ?? 1;
    let carrito = new Carrito(ultimo + 1);
    console.log(carrito)
    await archivoCarritos.save({id: carrito.id, idHash: carrito.idHash, timestamp: carrito.timestamp, productos: carrito.productos})
        .then(response => {
            ret = response;
        })

    return ret;
}

function existeCarrito(id) {
    let arr = [...archivoCarritos.arrObjetos];
    let objeto = arr.find((obj) => obj.id == id);
    return objeto;
}


async function borrarCarritos(id) {
    // verifica existencia del producto
        await archivoCarritos.deleteById((id))
            .then(response => {
                ret = response;
            })
            .catch(err => ret = [{ error: err.message }]);
    return ret;
}



/*
const agregarProducto = (obj) => {
    archivoCarritos.ultimoId()
        .then(ultimo => {
            console.log('ultimo' + ultimo)
            const { nombre, autor, foto, precio, descripcion, codigo, stock } = obj;
            return new Producto(ultimo + 1, nombre, autor, foto, precio, descripcion, codigo, stock);
        })


}
*/

async function agregarProducto(idcar, idp) {
    let ret = [{ estado: 'No se pudo guardar' }];
    try {

        let producto = await archivoLibros.getById(idp)
        let carrito = await archivoCarritos.getById(idcar)

        carrito[0].productos.push(producto[0])
        await archivoCarritos.actualizaArchivo(carrito[0], idcar)
            .then(response => {
                ret = response;
            });

    } catch (err) {
        console.log(err);

    }
    return ret;
}

const listarCarritos = async (id = '') => {
    console.log(archivoCarritos.getAll())
    let ret;
    if (id == '') {
        ret = await archivoCarritos.getAll()
            .then(rows => { return rows })
            .catch(err => console.log(err));
    } else {
        ret = await archivoCarritos.getById(id)
            .then(rows => { return rows })
            .catch(err => console.log(err));
    }
    return ret;
}


/*const listarProductosCarrito = async (idcar) => {
    let carrito;
    let ret;
    if ((existeCarrito(parseInt(idcar)) !== undefined)) {
        carrito = existeCarrito(idcar);
        ret = carrito.productos;
    } else {
        ret = [{ error: 'Carrito no encontrado' }];
    }
    return ret;
}
*/

const listarProductosCarrito = async (idcar) => {
    
    let ret;
    let carrito = await archivoCarritos.getById(idcar)
    return carrito[0].productos;
}

const eliminarProductosCarrito = async (idcar, idp) => {
    
    let productos = [];
    let carrito = await archivoCarritos.getById(idcar)
    productos = carrito[0].productos;
    console.log(productos)
    console.log(idp)
    let restoProductos = productos.filter(prod => prod._id != idp);
   // let indice = archivoCarritos.arrObjetos.findIndex(carrito => carrito.id === idcar);
    //archivoCarritos.arrObjetos[indice].productos = restoProductos;
    carrito[0].productos = restoProductos;

    await archivoCarritos.actualizaArchivo(carrito[0], idcar)
        .then(response => {
           return response;

        });
}

/*
const eliminarProductosCarrito = async (idcar, idp) => {
    let carrito = existeCarrito(parseInt(idcar));
    let ret;
    let productos = [];
    if (carrito !== undefined) {

        productos = carrito.productos;
        console.log((carrito))

        let restoProductos = productos.filter(prod => prod.id !== idp);

        let indice = archivoCarritos.arrObjetos.findIndex(carrito => carrito.id === idcar);
        archivoCarritos.arrObjetos[indice].productos = restoProductos;

        await archivoCarritos.actualizaArchivo()
            .then(response => {
                ret = archivoCarritos.arrObjetos;

            });
        // ret = archivoCarritos.arrObjetos;
    } else {
        ret = [{ error: 'Carrito no encontrado' }];
    }
    return ret;
}
*/
module.exports = {
    archivoCarritos,
    nuevoCarrito,
    borrarCarritos,
    agregarProducto,
    listarProductosCarrito,
    eliminarProductosCarrito,
    listarCarritos
};
