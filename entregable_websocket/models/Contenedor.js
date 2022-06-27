
class Contenedor {
    path_db = './DB/';
    arrObjetos = [];

    constructor(nombrearchivo, fs = 0) {
        this.nombrearchivo = nombrearchivo;
        this.fs = fs;

    }

    async save(objeto) {
        try {
            //let arr = await this.getAll() ?? [];
            //this.arrObjetos = [...arr];
            let arr = [...this.arrObjetos];
            let id = 1;

            if (arr.length > 0) {
                id = arr[arr.length - 1].id + 1;
            }
            let objetoNuevo = Object.assign({ id: id }, objeto);
            this.arrObjetos.push(objetoNuevo);
            await this.fs.promises.writeFile(this.path_db + this.nombrearchivo, JSON.stringify(this.arrObjetos, null, 2));

            return id;
        } catch (err) {
            console.log("Se produjo un error: " + err);
            return null;
        }
    }

    async getById(id) {       
        let arr = [...this.arrObjetos];
        let objeto = arr.find((obj) => obj.id === id) ?? null;
        return objeto;
    }

    async getAll() {
        try {
            let arr = await this.fs.promises.readFile(this.path_db + this.nombrearchivo, 'utf-8');
            this.arrObjetos = JSON.parse(arr);
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
        let objeto = await this.getById(id);
        if (objeto !== null) {
            try {
                let arrResultado = this.arrObjetos.filter(objeto => objeto.id !== id);
                this.arrObjetos = [...arrResultado];
                return `id ${id} borrado con exito`;
            } catch (err) {
                return null;
            }
        } else {
            // console.log('id no encontrado');
            return `id ${id} no encontrado`;
        }
    }

}

module.exports = Contenedor;