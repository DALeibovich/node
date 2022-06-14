
/********* PANEL DE COMANDOS *****************/

// Variables para el funcionamiento del test
let ejecutar = 'save'; // comandos a utilizar: save, getAll, getById, deleteById, deleteAll
let nombreArchivo = 'productos.txt'; //se genera en el directorio /DB/
let id_getById = 5; // id usado para traer un objeto
let id_deleteById = 4; // id usado para borrar un objeto

/**********************************************/

const fs = require('fs');
const Contenedor = require('./Clases/Contenedor.js');
let archivoLibros = new Contenedor(nombreArchivo, fs);

if (ejecutar == 'save') {
    // Agrega un objeto e incrementa en el ID
    let objetoNuevo = archivoLibros.save({
        nombre: 'El señor de los anillos',
        autor: 'J. J. Tolken',
        precio: 23.45,
        foto: 'https://images.cdn1.buscalibre.com/fit-in/360x360/66/1a/661a3760157941a94cb8db3f5a9d5060.jpg'
    })
        .then(res => console.log(res))
        .catch(err => console.log(err));
}

if (ejecutar == 'getAll') {
    // Muestra todos los objetos del archivo
    archivoLibros.getAll()
        .then(res => console.log(res))
        .catch(err => console.log(err));
}

if (ejecutar == 'getById') {
    // Busca un objeto por ID
    archivoLibros.getById(id_getById)
        .then(res => console.log(res))
        .catch(err => console.log(err));
}

if (ejecutar == 'deleteById') {
    // Elimina el objeto segun el ID
    archivoLibros.deleteById(id_deleteById)
        .then(res => console.log(res))
        .catch(err => console.log(err));
}

if (ejecutar == 'deleteAll') {
    // Elimina todos los objetos que hay en el archivo
    archivoLibros.deleteAll()
        .then(res => console.log(res))
        .catch(err => console.log(err));
}

/* --------------------------------
let interval = setTimeout(()=>{
    console.log(archivoLibros.arrObjetos.id);
},100);
*/