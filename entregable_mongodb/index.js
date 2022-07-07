// conectamos / creamos la database ecommerce
db = connect('mongodb://localhost/ecommerce');

/*********** CREACION DE TABLA Y REGISTROS MENSAJES *********************************/
db.createCollection("mensajes");
let mensajes = [
    { msg: "Bienvenido", fecha: Timestamp(), agregadoPor: "foro@libreriacoder.com" },
    { msg: "Hola, soy juan", fecha: Timestamp(), agregadoPor: "juan@gmail.com" },
    { msg: "Yo david ", fecha: Timestamp(), agregadoPor: "david@gmail.com" },
    { msg: "Que bueno esta el nuevo libro de Harry", fecha: Timestamp(), agregadoPor: "juan@gmail.com" },
    { msg: "cual edicion no la vi aun?", fecha: Timestamp(), agregadoPor: "david@libreriacoder.com" },
    { msg: "La segunda edicion", fecha: Timestamp(), agregadoPor: "lucas@gmail.com" },
    { msg: "El precio es de 3400 pesos", fecha: Timestamp(), agregadoPor: "fernando@libreriacoder.com" },
    { msg: "Tan caro!!!", fecha: Timestamp(), agregadoPor: "juan@gmail.com" },
    { msg: "Y bue, es la inflacion", fecha: Timestamp(), agregadoPor: "lucas@gmail.com" },
    { msg: "Paso, no lo compro ni a palos", fecha: Timestamp(), agregadoPor: "juan@gmail.com" },
]
db.mensajes.insertMany(mensajes);

/***********CREACION DE TABLA Y REGISTROS PRODUCTOS *********************************/
db.createCollection("productos");
let productos = [
    { nombre: "Como agua para chocolate", autor: "Laura Esquivel", precio: 2845, foto: "https://cdnlaol.laanonimaonline.com/web/images/productos/b/0000012000/12198.jpg", agregadoPor: "davidleibovich@gmail.com" },
    { nombre: "El principito", autor: "Antoine de Saint-Exupéry", precio: 1315, foto: "https://images.cdn1.buscalibre.com/fit-in/360x360/34/29/34292c8e89f726f2ef8924073ff4c382.jpg", agregadoPor: "davidleibovich@gmail.com" },
    { nombre: "Harry Potter y la Piedra Filosofal", autor: "J. K. Rowling ", precio: 1595, foto: "https://images.cdn2.buscalibre.com/fit-in/360x360/e3/bc/e3bcd85377567759874a0664f894a67b.jpg", agregadoPor: "davidleibovich@gmail.com" },
    { nombre: "Harry Potter 2", autor: "J. K. Rowling ", precio: 2595, foto: "https://images.cdn2.buscalibre.com/fit-in/360x360/e3/bc/e3bcd85377567759874a0664f894a67b.jpg", agregadoPor: "davidleibovich@gmail.com" },
    { nombre: "Harry Potter 3", autor: "J. K. Rowling ", precio: 3595, foto: "https://images.cdn2.buscalibre.com/fit-in/360x360/e3/bc/e3bcd85377567759874a0664f894a67b.jpg", agregadoPor: "davidleibovich@gmail.com" },
    { nombre: "Harry Potter 4", autor: "J. K. Rowling ", precio: 4595, foto: "https://images.cdn2.buscalibre.com/fit-in/360x360/e3/bc/e3bcd85377567759874a0664f894a67b.jpg", agregadoPor: "davidleibovich@gmail.com" },
    { nombre: "Harry Potter 5", autor: "J. K. Rowling ", precio: 4999, foto: "https://images.cdn2.buscalibre.com/fit-in/360x360/e3/bc/e3bcd85377567759874a0664f894a67b.jpg", agregadoPor: "davidleibovich@gmail.com" },
    { nombre: "El señor de los anillos 1", autor: "J. J. Tolking ", precio: 1000, foto: "https://http2.mlstatic.com/D_NQ_NP_734355-MLA50214993545_062022-O.webp", agregadoPor: "davidleibovich@gmail.com" },
    { nombre: "El señor de los anillos 2", autor: "J. K. Tolking ", precio: 2000, foto: "https://http2.mlstatic.com/D_NQ_NP_734355-MLA50214993545_062022-O.webp", agregadoPor: "davidleibovich@gmail.com" },
    { nombre: "El señor de los anillos 3", autor: "J. K. Tolking ", precio: 3000, foto: "https://http2.mlstatic.com/D_NQ_NP_734355-MLA50214993545_062022-O.webp", agregadoPor: "davidleibovich@gmail.com" }
];
db.productos.insertMany(productos);

/*********** LISTAR TODOS LOS PRODUCTOS DE CADA COLECCION ****************************/
db.mensajes.find();
db.productos.find();

/*********** CANTIDAD DE DOCUMENTOS DE CADA COLECCION *********************************/
db.mensajes.estimatedDocumentCount();
db.productos.estimatedDocumentCount();

/***************** CRUD *********************************/
// Create
db.productos.insertOne({ nombre: "Harry Potter y la Piedra Filosofal", autor: "J. K. Rowling ", precio: 355, foto: "https://images.cdn2.buscalibre.com/fit-in/360x360/e3/bc/e3bcd85377567759874a0664f894a67b.jpg", agregadoPor: "davidleibovich@gmail.com" });
// Read
db.productos.find({ "precio": { $lt: 1000 } }, { "nombre": 1 });
db.productos.find({ "precio": { $gte: 1000, $lte: 3000 } }, { "nombre": 1 });
db.productos.find({ "precio": { $gt: 3000 } }, { "nombre": 1 });
db.productos.find().skip(2).limit(1).sort({ "precio": 1 })
// Update
db.productos.updateMany({}, { $set: { "stock": 100 } });
db.productos.updateMany({ "precio": { $gt: 4000 } }, { $set: { "stock": 0 } });
// delete
db.productos.deleteMany({ "precio": { $lt: 1000 } });

// conectamos a la DB admin para poder crear el user
db = connect('mongodb://localhost/admin');
// Creamos el usuario pepe
db.createUser(
    {
        user: "pepe",
        pwd: "asd456",
        roles: [
            { role: "read", db: "ecommerce" }
        ]
    }
);
// Autorizamos al usuario pepe
db.auth({
    user: 'pepe',
    pwd: 'asd456',
    mechanism: 'SCRAM-SHA-1',
    passwordDigestor: 'client'
});

// Probamos que no pueda borrar el usuario pepe
db = connect('mongodb://localhost/ecommerce');
db.productos.deleteMany({ "precio": { $lt: 1000 } });
