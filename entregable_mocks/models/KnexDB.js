class KnexDB {
    knexConexion;
    path_db = './DB/';
    arrObjetos = [];

    constructor(objConexion, tabla) {
        this.objConexion = objConexion
        this.tabla = tabla;
        this.conexion = this.conectar(objConexion);

    }

    // realiza la conexion a la DB
    conectar = async (objConexion = this.objConexion) => {
        const knex = require('knex')(objConexion);
        this.knexConexion = knex;
        return knex;
    }

    // destruye la conexion a la DB
    desconectar = async () => {
        this.knexConexion.destroy();
    }

    async save(objeto, tabla = this.tabla) {
        try {
            //let arr = await this.getAll() ?? [];
            //this.arrObjetos = [...arr];
            let arr = [...this.arrObjetos];
            let id = 1;

            if (arr.length > 0) {
                id = arr[arr.length - 1].id + 1;
            }
            let objetoNuevo = objeto;
            this.arrObjetos.push(objetoNuevo);
            await this.knexConexion.from(tabla).insert(objetoNuevo)
                .then(rows => {
                    this.arrObjetos = this.getAll() ?? [];
                })
                .catch(err => {
                    console.log(err);
                })


            return id;
        } catch (err) {
            console.log("Se produjo un error: " + err);
            return null;
        }
    }

    getAll = async (tabla = this.tabla) => {
        try {
            await this.knexConexion.from(tabla).select('*')
                .then(rows => this.arrObjetos = rows)
                .catch(err => {
                    console.log(err);
                })


            return this.arrObjetos;

        } catch (err) {
            console.log("No se pudo ejecutar: " + err.message);
            return null;
        }
    }


    getByCampo = async (campo = 'id', valor = '0', tabla = this.tabla) => {

        let ret;
        try {
            await this.knexConexion.from(tabla).select('*')
                .where(campo, valor)
                .then(rows => {
                    ret = rows;
                })
                .catch(err => {
                    console.log("No se pudo ejecutar: " + err.message);
                    ret = null;
                })



            return ret;

        } catch (err) {
            console.log("No se pudo ejecutar: " + err.message);
            return null;
        }
    }


    getById = async (id, tabla = this.tabla) => {
        let ret = await this.getByCampo('id', id, tabla)
            .then(res => {
                return res;
            })
            .catch(err => {
                console.log("No se pudo ejecutar: " + err.message);
                ret = null;
            })

        return ret;
    }

}


module.exports = {
    KnexDB
}

