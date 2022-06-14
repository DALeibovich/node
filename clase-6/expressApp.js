const express = require('express');
const app = express();

app.get('/', (req, res) => {
    res.send(`<h1 style="color: blue">Bienevenido a express</h1>`)
   

})

let visitas = 1;
app.get('/visitas', (req, res) => {
    res.send(`Visitas: ${visitas++}`)
   

})

let fecha = new Date();
let hora = fecha.getHours();
app.get('/fyh', (req, res) => {
    res.send(`Son las: ${hora}`)
    

})

const server = app.listen(8080, ()=>{
console.log(`Servidor escuchado en el puerto ${server.address().port}`);
});
server.on('error', err => console.error(`Error: ${err.message}`));

