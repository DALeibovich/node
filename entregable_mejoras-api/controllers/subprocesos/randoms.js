

// funcion para generar numeros entre rangos
function getRandomArbitrary(min = 1, max = 1000) {
    return Math.random() * (max - min) + min;
}

const generaRandom = (iteraciones) => {
    
    //Maximo numero a generar
    const max = 1000;

    //Inicializo array con ceros
    let randomValues = Array(max + 1).fill(0);
    for (let i = 1; i <= iteraciones; i++) {       
        const random_number = parseInt(getRandomArbitrary(1,1000));       
        randomValues[random_number] = randomValues[random_number] + 1;
    }

    let resultado = randomValues.filter(x => x != 0)
    // Array a objeto
    let i = 0;
    objRandom = resultado.reduce(function (obj, v) {
        obj[i] = v;
        i++;
        return obj;
    }, {});

    delete objRandom["0"];

    return objRandom;
}

// Escucha el pedido del proceso padre
process.on('message', (iteracciones) => {
     //const randomResultado = generaRandom(iteracciones);
    //Enviamos respuesta al proceso padre
    process.send(generaRandom(iteracciones));
})