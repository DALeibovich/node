class Orden {

    constructor(id, timestamp= Date.now(), productos = [], cliente='{}', idcarrito = '-', info={}, total, estado='generada') {
        this.id = id;
        this.timestamp = timestamp;
        this.productos = productos;
        this.cliente = cliente;
        this.carrito = idcarrito;
        this.info = info;
        this.estado = estado;
        this.total = total;
    }

 
}



module.exports = {Orden};