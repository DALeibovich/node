//import { faker } from '@faker-js/faker';
const { faker } = require('@faker-js/faker/locale/es');

class FakerDAO {

    constructor(objeto, limite) {
        return this.generaProductosAleatorio(limite)
    };
    generaProductosAleatorio = (limite = 10) => {
        let arr = Array();
        for (let i = 0; i < limite; i++) {
            let objeto = {
                nombre: faker.music.songName(),
                autor: faker.name.firstName() + " " + faker.name.lastName(),
                precio: faker.finance.amount(5, 100, 2, '$'),
                foto: faker.image.image(),
                agregadoPor: faker.internet.email()
            }
            arr.push(objeto)
        }
        return arr;
    }
}

module.exports = {
    FakerDAO
}