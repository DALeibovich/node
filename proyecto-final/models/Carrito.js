class Carrito {

    constructor(id, idHash=this.makeRandomId(20), timestamp= Date.now(), productos = []) {
        this.id = id;
        this.idHash = idHash;
        this.timestamp = timestamp;
        this.productos = productos;
    }

    makeRandomId = (length) => {
        let result = ''
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
        for (let i = 0; i < length; i++) {
            result += characters.charAt(Math.floor(Math.random() * characters.length));
        }
        return result;
    }
}



//const carrito1 = new Carrito(1);
//console.log(carrito1.idHash);
module.exports = Carrito;