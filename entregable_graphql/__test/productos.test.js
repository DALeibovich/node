const chai = require('chai')
const chaiHttp = require('chai-http')

const assert = require('assert') 

let should = chai.should();
chai.use(chaiHttp);

const url= 'http://localhost:8080';

const data = {
    "nombre": "El señor insertado desde test",
    "autor": "JJ tolken",
    "precio": "10",
    "foto": "https://http2.mlstatic.com/D_NQ_NP_734355-MLA50214993545_062022-O.webp",
    "agregadoPor": "davidleibovich@gmail.com"
}

const dataUpdated = {
    "nombre": "El señor modificado con test",
    "autor": "JJ tolken",
    "precio": "15",
    "foto": "https://http2.mlstatic.com/D_NQ_NP_734355-MLA50214993545_062022-O.webp",
    "agregadoPor": "davidleibovich@gmail.com"
}

let cantidadProductos = 0;
let productId = 0;

describe('Estado del request al solicitar productos',() => {
    it('Debería devolver un estado 200 productos', (done) => {
        chai.request(url)
        .get('/api/productos')
        .end( (err,res) => {
            
            res.should.have.status(200);
            res.body.should.be.a('array');
            cantidadProductos = res.body.length
            done();
        });
    });
});

describe('Obtener productos',() => {
    it('Debería obtener el listado de productos y esperar un array', (done) => {
        chai.request(url)
        .get('/api/productos')
        .end( (err,res) => {
            res.should.have.status(200);
            res.body.should.be.a('array');
            assert.strictEqual(res.body.length, cantidadProductos)
            done();
        });
    });
});

describe('Insertar producto',() => {
    it('Debería poder insertar un producto obtener un objeto', (done) => {
        chai.request(url)
        .post('/api/productos')
        .send(data)
        .end( (err,res) => {
            res.should.have.status(200);
            res.body.should.be.a('object');
            productId = res.body.id
            cantidadProductos++;
            done();
        });
    });
    it('Debería tener la cantidad de productos correcta despues de haber insertado el producto', (done) => {
        chai.request(url)
        .get('/api/productos')
        .end( (err,res) => {
            res.should.have.status(200);
            res.body.should.be.a('array');
            assert.strictEqual(res.body.length, cantidadProductos)
            done();
        });
    });

});



describe('Modificación de producto',() => {
    it(`Debería poder modificar un producto y ver el dato modificado`, (done) => {
        chai.request(url)
        .put(`/api/productos/${productId}`)
        .send(dataUpdated)
        .end( (err,res) => {
            res.should.have.status(200);
            res.body.should.be.a('object');
            res.body.should.have.property('precio').eql('15');
            res.body.should.have.property('nombre').eql('El señor modificado con test');
            done();
        });
    });
});

   
describe('Eliminación de producto',() => {
    it('Debería poder eliminar un producto', (done) => {
        chai.request(url)
        .delete(`/api/productos/${productId}`)
        .end( (err,res) => {
            res.should.have.status(200);
            res.body.should.be.a('array');
            cantidadProductos--;
            done();
        });
    });

    it('Debería tener la cantidad de productos correcta despues de haber eliminado el producto', (done) => {
        chai.request(url)
        .get('/api/productos')
        .end( (err,res) => {
            res.should.have.status(200);
            res.body.should.be.a('array');
            assert.strictEqual(res.body.length, cantidadProductos)
            done();
        });
    });
    
});

