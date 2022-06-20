// creamos el contenedor de archivo
const fs = require('fs');
// incluimos el contenedor de archivo con su modelo de datos
const Contenedor = require('../models/Contenedor');
const nombreArchivo = 'productos.txt';
let archivoLibros = new Contenedor(nombreArchivo, fs);

// obtenemos todos los productos del archivo
archivoLibros.getAll()
    .then(res => console.log('productos cargados con exito'))
    .catch(err => console.log(err));

// funcion para verificar existencia del producto
function existeProducto(id) {
    let arr = [...archivoLibros.arrObjetos];
    let objeto = arr.find((obj) => obj.id == id);
    return objeto;
}

// funcion para actualizar el producto
async function actualizaProducto(objetoNuevo, idp) {
    let ret;
    // verifica existencia del producto
    if ((existeProducto(parseInt(idp)) !== undefined)) {
        let arr = [...archivoLibros.arrObjetos];
        let index = arr.findIndex((obj) => obj.id == idp);
        archivoLibros.arrObjetos[index] = objetoNuevo;
        ret = [archivoLibros.arrObjetos];
    } else {
        ret = [{ error: 'Producto no encontrado' }];
    }
    return ret;
}

// funcion para borrar el producto
async function borrarProducto(idp) {

    let ret;
    // verifica existencia del producto
    if ((existeProducto(parseInt(idp)) !== undefined)) {
        await archivoLibros.deleteById(parseInt(idp))
            .then(response => {
                ret = [...archivoLibros.arrObjetos];
            })
            .catch(err => ret = [{ error: err.message }]);
    } else {
        // res.status(404).json({ error: 'Producto no encontrado' });
        ret = [{ error: 'Producto no encontrado' }];
    }
    return ret;
}

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
    escribirArchivo
}