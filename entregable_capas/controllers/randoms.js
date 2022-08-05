const { fork } = require('child_process');


const generaRandoms =  (req,res) => {
    //Cantidad de iteraciones
    const cantidadIteraciones = req.query.cant || 100000000;
    console.log(cantidadIteraciones)

    const randomFork = fork('./controllers/subprocesos/randoms.js')
     //Iniciamos el subproceso
     randomFork.send(cantidadIteraciones);

    return randomFork.on('message', (result) => {
        //respuesta subproceso
       
        res.send(result)
        return result;
    })
    
   

}

module.exports = {
    generaRandoms
}