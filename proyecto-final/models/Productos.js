class Producto {

    constructor(id, nombre, autor, foto, precio, descripcion, codigo, stock, genero='-', timestamp = Date.now()) {
        this.id = id;
        this.nombre = nombre;
        this.autor = autor;
        this.foto = foto;
        this.precio = precio;
        this.descripcion = descripcion;
        this.codigo = codigo;
        this.stock = parseInt(stock);
        this.timestamp = timestamp;
        this.genero = genero
    }
}

module.exports = Producto;