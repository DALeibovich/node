const fs = require('fs');

class Contenedor {
   // static idarchivoGlobal = 1;
    constructor(nombrearchivo, idObjeto = 0) {
        this.nombrearchivo = nombrearchivo;
       // this.idObjeto = idObjeto;
    }

    save(objeto) {
        let arr = [this.getAll()];
        let id = 1;
        if(arr !== null) id = arr.lengh+1;
        console.log(arr);
        let objetoNuevo = Object.assign({id: id}, objeto);
        try {
            fs.writeFileSync("./DB/" + this.nombrearchivo, JSON.stringify(objetoNuevo, null, 2), (err) => {
                if (err) console.log(err.message);

            })
            return id;
        } catch (err) {
            console.log(err.message);
            return 0;
        }
    }

    getById(id) {
        return JSON.parse(fs.readFileSync("./DB/" +  this.nombrearchivo))
    }

    getAll(){
        return JSON.parse(fs.readFileSync("./DB/" +  this.nombrearchivo))
    }
}


let archivo_1 = new Contenedor('libros.json');
let idArchivo_1 = archivo_1.save({nombre: 'El señor', autor: 'JJ Tolken' });
//let archivo_2 = new Contenedor('revistas.json');
//let idArchivo_2 = archivo_2.save({id:2, nombre: 'El señor', autor: 'JJ Tolken' });
console.log(idArchivo_1);
//console.log(idArchivo_2);
let a = archivo_1.getById(idArchivo_1);
//console.log(a);
/*






try {
let datos = fs.readFileSync('./data.txt', 'utf8');
console.log(datos);
}catch(e) {
    console.error(e.message);
    datos = "";
}

*/
