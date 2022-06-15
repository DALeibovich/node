const express = require('express');
const fs = require('fs');
const app = express();
const port = 8080;

const nombreArchivo = 'productos.txt';
const Contenedor = require('./Clases/Contenedor');
let archivoLibros = new Contenedor(nombreArchivo, fs);
let productos = [];

// obtenemos todos los productos del archivo
archivoLibros.getAll()
.then(res => productos = res)
.catch(err => console.log(err));

// Creacion del servidor
const server = app.listen(port, () => {
    console.log(`Servidor escuchado en el puerto ${server.address().port}`);
});


// endPoint para todos los productos
app.get('/productos', (req, res) => {
  res.send(`<pre>${JSON.stringify(productos,null,2)}</pre>`);
    
});

// endPoint para productos random
app.get('/productoRandom', (req, res) => {
    let idRandom = parseInt(Math.random() * productos.length);
    res.send(`<pre>${JSON.stringify(productos[idRandom],null,2)}</pre>`);
});