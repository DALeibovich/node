const http = require('http');

const port = 8000;
let fecha = new Date();
let hora = fecha.getHours();
let saludo = "";
if(hora >= 6  ) saludo = "Buenas dias"; 
if(hora >= 13  ) saludo = "Buenas tardes"; 
if(hora >= 20 ) saludo = "Buenas noches"; 
const server = http.createServer((peticion, respuesta) => {
    respuesta.end(`${saludo}`);
});

const connectedServer = server.listen(port, () => {
    console.log(`servidor escuchando en el puerto ${connectedServer.address().port}`);
})