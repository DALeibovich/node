// creamos el contenedor de archivo
const fs = require('fs');
// incluimos el contenedor de archivo con su modelo de datos
const Contenedor = require('../models/Contenedor');
const Carrito = require('../models/Carrito');
const nombreArchivoCarrito = 'carritos.json';
let archivoCarritos = new Contenedor(nombreArchivoCarrito, fs);
const { archivoLibros, existeProducto, borrarProducto, actualizaProducto, escribirArchivo } = require('./productos');
// obtenemos todos los productos del archivo
archivoCarritos.getAll(Carrito)
    .then(res => {
        console.log('Carritos cargados con exito')
    })
    .catch(err => console.log(err));


const nuevoCarrito = () => {
    let ultimo = archivoCarritos.ultimoId();
    return new Carrito(ultimo + 1);

}

function existeCarrito(id) {
    let arr = [...archivoCarritos.arrObjetos];
    let objeto = arr.find((obj) => obj.id == id);
    return objeto;
}


async function borrarCarrito(id) {

    let ret;
    // verifica existencia del producto
    if ((existeCarrito(parseInt(id)) !== undefined)) {
        await archivoCarritos.deleteById(parseInt(id))
            .then(response => {
               
                ret = [...archivoCarritos.arrObjetos];
            })
            .catch(err => ret = [{ error: err.message }]);
            await  archivoCarritos.actualizaArchivo();
    } else {

        ret = [{ error: 'Carrito no encontrado' }];
    }
    return ret;
}


async function agregarProducto(idcar, idp) {
    let ret = [{ estado: 'No se pudo guardar' }];
    try {
        let carrito = await archivoCarritos.getById(idcar);
        let producto = await archivoLibros.getById(idp);
        carrito.productos.push(producto)
        console.log(carrito)
        await archivoCarritos.actualizaArchivo()
            .then(response => {
                ret = archivoCarritos.arrObjetos;

            });

    } catch (err) {
        console.log(err);

    }
    return ret;


}



const listarProductosCarrito = async (idcar) => {
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


const eliminarProductosCarrito = async (idcar, idp) => {
    let carrito = existeCarrito(parseInt(idcar));
    let ret;
    let productos =[];
    if ( carrito !== undefined) {
       
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

module.exports = {
    archivoCarritos,
    nuevoCarrito,
    borrarCarrito,
    agregarProducto,
    listarProductosCarrito,
    eliminarProductosCarrito
};
