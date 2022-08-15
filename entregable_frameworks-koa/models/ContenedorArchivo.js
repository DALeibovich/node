class ContenedorArchivo {
    path_db = './DB/';
    arrObjetos = [];

    constructor(nombrearchivo) {
        this.nombrearchivo = nombrearchivo;
        this.fs = require('fs');

    }

    async save(objeto) {
        try {
            let arr = await this.getAll() ?? [];
            this.arrObjetos = [...arr];
            // let arr = [...this.arrObjetos];
            let id = 1;

            if (arr.length > 0) {
                id = arr[arr.length - 1].id + 1;
            }
            let objetoNuevo = Object.assign({ id: parseInt(id) }, objeto);
            this.arrObjetos.push(objetoNuevo);
            await this.fs.promises.writeFile(this.path_db + this.nombrearchivo, JSON.stringify(this.arrObjetos, null, 2));

            return objetoNuevo;
        } catch (err) {
            console.log("Se produjo un error: " + err);
            return null;
        }
    }

    async getById(id) {
        let ret;
        await this.getAll()
            .then((res) => {
                let objeto = res.find((obj) => obj.id == id) ?? null;
                ret = objeto;
            })
        return ret;
    }

    // consulta el archivo y lo convierte a un array objetos obj=undefined usa objetos literales
    async getAll(obj = undefined) {
        console.log(this.nombrearchivo)
        try {
            let arr = await this.fs.promises.readFile(this.path_db + this.nombrearchivo, 'utf-8');
            if (typeof obj === 'object') {
                arr.forEach(element => {
                    this.arrObjetos.push(this.convertirObjetoLiterals((element), obj));
                });
            } else {
                this.arrObjetos = JSON.parse(arr);
            }
            //console.log(this.arrObjetos)
            return this.arrObjetos;
        } catch (err) {
            if (err.code === 'ENOENT') console.log("Archivo no existe -> Creado con exito");
            return null;
        }
    }

    async deleteAll() {
        try {
            let arr = await this.getAll() ?? [];
            if (arr.length > 0) {
                this.arrObjetos = [];
                this.fs.promises.writeFile(this.path_db + this.nombrearchivo, "[]");
                return 'Todos los registros fueron borrado con exito';
            } else {
                return 'No existe objetos para borrar';
            }
        } catch (err) {
            return null;
        }

    }

    async deleteById(id) {
        let ret;
        let objeto = await this.getById(id);
      
        if (objeto !== null) {
            try {
                
                let arrResultado = this.arrObjetos.filter(objeto => objeto.id !== id);
                this.arrObjetos = [...arrResultado];
                await this.fs.promises.writeFile(this.path_db + this.nombrearchivo, JSON.stringify(this.arrObjetos, null, 2))
                    .then(response => {
                        ret = this.arrObjetos;

                    });
                return ret;
            } catch (err) {
                return null;
            }
        } else {
            // console.log('id no encontrado');
            return `id ${id} no encontrado`;
        }
    }

    ultimoId = () => {

        let id = 0;
        let arr = [...this.arrObjetos];
        if (arr.length > 0) {
            arr.sort((a, b) => b.id - a.id);
            id = arr[0].id
        }
        return parseInt(id);
    }


    convertirObjetoLiterals = (objetoLiteral, objeto) => {
        let obj = new objeto(objetoLiteral);
        return obj;
    }


    async actualizaArchivo(valor, id) {
        let ret = 'No se pudo guardar';
        try {


            let arr = [...this.arrObjetos];
            let index = arr.findIndex((obj) => obj.id == id);
            this.arrObjetos[index] = Object.assign({ id: parseInt(id) }, valor);
            ret = this.arrObjetos;
            await this.fs.promises.writeFile(this.path_db + this.nombrearchivo, JSON.stringify(this.arrObjetos, null, 2))
                .then(response => {
                    ret = 'Guardado con exito';

                });


            return ret;
        } catch (err) {
            console.log(err);
            return ret;
        }

    }

}

module.exports = { ContenedorArchivo };