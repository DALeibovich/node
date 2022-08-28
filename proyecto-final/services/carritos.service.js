const {carritos}  = require('../daos/importarClases');
let archivoCarritos = carritos; //new PersistenciaFactoryProductos();

// funcion para verificar existencia del producto
const existeCarrito = async (id) => {
    return await getCarritosService(id)
    
}

const getCarritosService = async (id = undefined) => {
    let ret;
    (id === undefined) ? ret = await archivoCarritos.getAll() : ret = await archivoCarritos.getById(id)
    return ret;
}

const agregarCarritosService = async (data) => {
    //console.log(data);
    //archivoCarritos.save(data)
    return await archivoCarritos.save(data) //getCarritosService();

}

//async actualizaArchivo(valor, id) {
const actualizaCarritosService = async (objetoNuevo, id) => {
    let ret;
    // verifica existencia del producto
    if ((existeCarrito((id)) !== undefined)) {
        await archivoCarritos.actualizaArchivo(objetoNuevo, id)
        return objetoNuevo;
    } else {
        ret = [{ error: 'Producto no encontrado' }];
    }
    return ret;
}

// funcion para borrar el producto
const borrarCarritosService = async (idp) => {

    let ret;
    // verifica existencia del producto

    if ((existeCarrito((idp)) !== undefined)) {
        await archivoCarritos.deleteById((idp))
            .then(rows => {
                ret = rows;
            })
            .catch(err => ret = [{ error: err.message }]);
    } else {

        ret = [{ error: 'Producto no encontrado' }];
    }
    return ret;
}

const actualizarCantidadService = async (id, productos) => {
    campo = { productos: productos };
    console.log(campo);
    return await archivoCarritos.actualizaArchivo(campo, id)

}

module.exports = {
    archivoCarritos,
    existeCarrito,
    agregarCarritosService,
    getCarritosService,
    actualizaCarritosService,
    borrarCarritosService,
    actualizarCantidadService
}


/*
 getCarritosService, 
 
 deleteCarritosService, 
 
 deleteProductosCarritosService,

 getProductosCarritosService, 
 
 addCarritosService, 
 
 addProductosCarritosService
*/