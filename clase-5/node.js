const productos = [
    { id:1, nombre:'Escuadra', precio:323.45 },
    { id:2, nombre:'Calculadora', precio:234.56 },
    { id:3, nombre:'Globo Terráqueo', precio:45.67 },
    { id:4, nombre:'Paleta Pintura', precio:456.78 },
    { id:5, nombre:'Reloj', precio:67.89 },
    { id:6, nombre:'Agenda', precio:78.90 }
]
let arrNombres = [];
let total = 0;
let promedio = 0;
productos.forEach(e=>{
    arrNombres.push(e.nombre);
    total += e.precio;
    
})
//strNombres = productos.map(({ nombre }) => nombre).join(',')
//intTotal = productos.reduce((prev, curr) => curr.precio + prev, 0)
//console.log(intTotal)

 productos.sort((a, b) => a.precio - b.precio)
 let menorValor = productos[0].nombre;
 let mayorValor = productos[productos.length-1].nombre

promedio = total/arrNombres.length;
console.log('Nombre:' + arrNombres.join(', '));
console.log('total: ' + total);
console.log('promedio: ' + promedio);
console.log('Menor valor: ' + menorValor);
console.log('Mayor valor: ' + mayorValor);
