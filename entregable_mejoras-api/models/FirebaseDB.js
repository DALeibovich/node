

const firebaseCliente = require('firebase-admin');
class FirebaseDB {
    firebaseCliente;
    firebaseConexion;
    path_db = './DB/';

    constructor(objConexion, tabla, conexion='') {
        this.objConexion = objConexion
        this.tabla = tabla;
      
        if(conexion=='') {
            this.conexion = this.conectar(objConexion);
        }else{
            this.conexion = conexion.firestore();
            this.firebaseCliente = conexion;
            this.firebaseConexion = conexion.firestore();
        }
      //this.conexion = conexion;
    }

    // realiza la conexion a la DB
    conectar = async (objConexion = this.objConexion) => {
        try {
            firebaseCliente.initializeApp({
                credential: firebaseCliente.credential.cert(objConexion.serviceAccount),
                databaseURL: objConexion.databaseURL
            });
            console.log('conectado a Firebase DB');
            this.firebaseCliente = firebaseCliente;
            this.firebaseConexion = firebaseCliente.firestore();
            return firebaseCliente.firestore();
        } catch (err) {
            console.error(err)
        }

    }

    // destruye la conexion a la DB
    desconectar = async () => {
        await this.firebaseCliente.close()
            .then(db => {
                console.log('Desconectado de Firebase');

            })
            .catch(err => console.error(err))

    }

    ultimoId = async (tabla = this.tabla) => {
        let ret;
        let result = await this.firebaseConexion.collection(tabla).get()
        ret = result.docs.map(doc => (doc.id))
        ret.sort((a, b) => b - a)
        return parseInt(ret[0]);

    }
    async save(objeto, tabla = this.tabla) {
        let ret;
        try {
            let id = await this.ultimoId();
            if(isNaN(id)) id = 0;
            console.log(objeto)
            await this.firebaseConexion.collection(tabla).doc(`${id + 1}`).create(objeto)
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
        return ret;
    }


    getAll = async (tabla = this.tabla) => {
        let ret;
        try {

            let result = await this.firebaseConexion.collection(tabla).get()
            ret =  doc.data();
           /* ret = result.docs.map(doc => ({
                id: doc.id,
                data: doc.data()
            }))*/
                console.log(ret)
            return ret;
        } catch (err) {
            console.log("No se pudo ejecutar: " + err);
            return null;
        }
    }

    deleteAll = async (tabla = this.tabla) => {
        let ret;
        try {
            await this.firebaseConexion.collection(tabla).doc().delete()
                .then(rows => { ret = rows })
                .catch(err => {
                    console.log(err);
                })


            return ret;

        } catch (err) {
            console.log("No se pudo ejecutar: " + err);
            return null;
        }
    }


    deleteById = async (id, tabla = this.tabla) => {
        let ret;
        try {

            await this.firebaseConexion.collection(tabla).doc(`${id}`).delete()
                .then(rows => { ret = rows })
                .catch(err => {
                    console.log(err);
                })


            return ret;

        } catch (err) {
            console.log("No se pudo ejecutar: " + err);

        }
    }


    getByCampo = async (filtro = "", tabla = this.tabla) => {

        let ret;
        try {
            await this.firebaseConexion.collection(tabla).get(filtro)
                .then(data => {
                    ret = data.docs
                })
                .catch(err => {
                    console.log(err);
                })

            return ret;

        } catch (err) {
            console.log("No se pudo ejecutar: " + err.message);
            return null;
        }
    }

    actualizaArchivo = async (valor, id, tabla = this.tabla) => {
        let ret;
        await this.firebaseConexion.collection(tabla).doc(`${id}`).update(valor)
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

        let result = await this.firebaseConexion.collection(tabla).get()
        result = result.docs.map(doc => ({
            id: doc.id,
            data: doc.data()
        }))
        let item = result.find(elem => elem.id == id)
        return item
    }

}


module.exports = {
    FirebaseDB
}

