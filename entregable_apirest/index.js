
const express = require('express');
const app = express();

const path = require('path');
const productos = require('./routes/productos');

// servidor escuchando sobre el puerto 8080
app.listen(8080, (err) => {
    if (err) {
        console.error(err);
    } else {
        console.log('escuchando on 8080');
    }
})

// para capturar tipos de datos y no solo string
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// para que tome la carpeta publica or defecto y el index.html contenido
app.use(express.static(path.join(__dirname, 'public')));

// ruteo para los productos
app.use('/', productos);

// por default si no encuetra una ruta especifica
app.use((req, res) => {
    res.send('endPoint no encontrado')
})
