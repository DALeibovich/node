require('dotenv').config();
const express = require('express');
const app = express();

const path = require('path');
const productos = require('./routes/productos');
const carritos = require('./routes/carritos');
const controlAccesoApi = require('./middlewares/controlAccesoApi');
const PORT = process.env.PORT ?? 8080;

// servidor escuchando sobre el puerto 8080
const server = app.listen(PORT, (err) => {
    if (err) {
        console.error(err);
    } else {
        console.log(`Escuchando puerto: ${server.address().port}`);
    }
})

// para capturar tipos de datos y no solo string
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// para que tome la carpeta publica or defecto y el index.html contenido
app.use(express.static(path.join(__dirname, 'public')));

// ruteo para los productos
app.use('/api/', controlAccesoApi);
app.use('/api/productos', productos);
app.use('/api/carrito', carritos);


// por default si no encuentra una ruta especifica
app.use((req, res) => {
    res.send({error: "-1", descripcion: `endPoint en ruta ${req.baseUrl + req.url} no disponible`})
})
