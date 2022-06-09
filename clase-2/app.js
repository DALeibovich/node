class Usuario {

    constructor(nombre = '', apellido = '', libros = [], mascostas = []) {

        this.nombre = nombre;
        this.apellido = apellido;
        this.libros = libros;
        this.mascostas = mascostas;

    }

    getFullName() {
        return ` ${this.nombre} ${this.apellido} `;
    }

    addMascotas(mascosta = '') {
        this.mascostas.push(mascosta);
    }

    countMascostas() {
        return this.mascostas.length;
    }

    addBook(nombre = '', autor = '') {
        this.libros.push({nombre: nombre, autor: autor});
    }

    getBooksName() {
        let nombre = [];
        this.libros.forEach(libros => nombre.push(libros.nombre));
        return nombre
    }

    getMascotas() {
        return this.mascostas;
    }

}

const persona = new Usuario('Juan', 'Perez');

persona.addBook('El señor de los anillos', 'J. R. R. Tolkien');
persona.addBook('El Principito', 'Antoine de Saint-Exupéry');

persona.addMascotas('Loro');
persona.addMascotas('Perro');

console.log(`Nombre: ${persona.getFullName()}`);
console.log(`Libros: ${persona.getBooksName().join(' | ')}`);
console.log(`Cantidad de Mascotas: ${persona.countMascostas()} (${persona.getMascotas().join(' | ')})`);

