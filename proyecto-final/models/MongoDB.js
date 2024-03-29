const { ObjectId } = require('mongodb');

const mongoCliente = require('mongodb').MongoClient;
class MongoDB {
    mongoCliente;
    mongoConexion;
    path_db = './DB/';
    arrObjetos = [];

    constructor(objConexion, tabla) {
        this.objConexion = objConexion
        this.tabla = tabla;
        this.conexion = this.conectar(objConexion);
    }

    // realiza la conexion a la DB
    conectar = async (objConexion = this.objConexion) => {

        let cliente = new mongoCliente(objConexion);
        await cliente.connect()
            .then(db => {
                console.log('conectado a mongoDB: ' + this.tabla);               
                this.mongoCliente = cliente;
                this.mongoConexion = cliente.db();
                return cliente.db();
            })
            .catch(err => console.error(err))
    }

    // destruye la conexion a la DB
    desconectar = async () => {
        await this.mongoCliente.close()
            .then(db => {
                console.log('Desconectado de mongoDB');

            })
            .catch(err => console.error(err))

    }

    async save(objeto, tabla = this.tabla) {
        let ret;
        try {
            //let id = await this.ultimoId();
            let objetoNuevo = objeto;            
            //await this.knexConexion.from(tabla).insert(objetoNuevo)
            await this.mongoConexion.collection(tabla).insertOne(objetoNuevo)
                .then(rows => {
                    ret = rows;
                })
                .catch(err => {
                    console.log(err);
                })

            
        } catch (err) {
            console.log("Se produjo un error: " + err);
            return null;
        }
        console.log(ret);
        return ret.insertedId;
    }

    



    deleteAll = async (tabla = this.tabla) => {
        try {
            await this.mongoConexion.collection(tabla).deleteMany()
                .then(rows => this.arrObjetos = rows)
                .catch(err => {
                    console.log(err);
                })


            return this.arrObjetos;

        } catch (err) {
            console.log("No se pudo ejecutar: " + err);
            return null;
        }
    }


    deleteById = async (id, tabla = this.tabla) => {
        try {
          //  if(id.length != 24 && typeof id !== Number) id=0;
          if(id===undefined || id===null) id=0;
          if(id.length != 24) id=0;
            let idObj = ObjectId(id)
            await this.mongoConexion.collection(tabla).deleteOne({ _id: idObj })
                .then(rows => this.arrObjetos = rows)
                .catch(err => {
                    console.log(err);
                })


            return this.arrObjetos;

        } catch (err) {
            console.log("No se pudo ejecutar: " + err);
            return null;
        }
    }


    getAll = async (tabla = this.tabla) => {
        try {
            await this.mongoConexion.collection(tabla).find().toArray()
                .then(rows => this.arrObjetos = rows)
                .catch(err => {
                    console.log(err);
                })


            return this.arrObjetos;

        } catch (err) {
            console.log("No se pudo ejecutar: " + err);
            return null;
        }
    }
    getByCampo = async (filtro = "", tabla = this.tabla) => {

        let ret;
        try {
            //console.log("FILTRO" + filtro)
            await this.mongoConexion.collection(tabla).find(filtro).toArray()
                .then(rows => {
                    ret = rows
                })
                .catch(err => {
                    console.log(err);
                })
                .catch(err => {
                    console.log("No se pudo ejecutar: " + err.message);
                    ret = null;
                })

            return ret || [];

        } catch (err) {
            console.log("No se pudo ejecutar: " + err.message);
            return null;
        }
    }

    


    ultimoId = async (tabla = this.tabla) => {
        let ret;
        
        await this.mongoConexion.collection(tabla).find().sort({ "id": -1 }).limit(1).toArray()
            .then(rows => {
                //console.log(rows.id)
                ret = rows[0].id ?? 0;
            })
            .catch(err => {
                console.log("No se pudo ejecutar: " + err.message);
                ret = null;
            })


        return ret;

    }


    actualizaArchivo = async (valor, id, tabla=this.tabla) =>{
       // console.log("IDDD" + id + valor);
        const options = { upsert: false };
        let ret;
        if(id===undefined || id===null) { id=0;}
        //console.log("IDDD" + id );
        
        if(id.toString().length !== 24){ id=0};
        let query = {"_id": ObjectId(id) };
        //console.log("IDDD" + id + valor);
        await this.mongoConexion.collection(tabla).updateOne(query,{$set: valor}, options)
        .then(rows => {
            ret = rows;
        })
        .catch(err => {
            console.log("No se pudo ejecutar: " + err.message);
            ret = null;
        })
        return ret;
    }



    getById = async (id, tabla = this.tabla) => {
        let ret;
        if(id===undefined || id===null || id==='') id=0;
        if(id.length != 24) id=0;
        let query = { _id: ObjectId(id) };
        await this.getByCampo(query, tabla)
            .then(res => {
                ret = res;
            })
            .catch(err => {
                console.log("No se pudo ejecutar: " + err.message);
                ret = null;
            })

        return ret;
    }

   


}


module.exports = {
    MongoDB
}

