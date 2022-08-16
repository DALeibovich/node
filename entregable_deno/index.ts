import { Application, Router } from "https://deno.land/x/oak/mod.ts";

localStorage.clear();

const app = new Application();

const router = new Router();
const PORT = 8080
const HOST = 'localhost'
let colores = new Array();
router
.get('/', (context) => {
  context.types = "text/html";
  context.response.body = 'Ejecute /color o /color/blue';
})
  .get('/color', (context) => {
    const color = localStorage.getItem('color')
    const msj =  color ? `Colores asignados: ${colores.join(', ')}` :'Todavia no se asignó ningun color'

    context.response.body = msj;
  })
  .get('/color/:color', (context) => {
    localStorage.setItem("color", context.params.color);
    colores.push(context.params.color);
    context.response.body = `Se ha asignado el color: ${context.params.color}`;
  });



app.use(router.routes());
app.use(router.allowedMethods());

console.log(`Server iniciado en el puerto ${PORT}...`)
await app.listen(`${HOST}:${PORT}`)