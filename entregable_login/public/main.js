const socket = io.connect();


// escucha el formulario para agregar un nuevo productos y enviarlo via soccket
const agregarProductos = document.getElementById('frmProducto');
agregarProductos.addEventListener('submit', (e) => {
    e.preventDefault();
    if (document.getElementById('emailUsuario').value == '') {
        notificaciones(`Debe ingresar un EMAIL antes de agregar un producto`, 'red');
    } else {
        const producto = {
            nombre: document.getElementById('nombre').value,
            autor: document.getElementById('autor').value,
            precio: document.getElementById('precio').value,
            foto: document.getElementById('foto').value,
            agregadoPor: document.getElementById('emailUsuario').value
        };
        // envia al server por socket para agregar un producto
        socket.emit('agregarProducto', producto);
    }
});

// renderiza los productos en la plantilla HBS obtenida de la carpeta publica
async function renderizaProductosWebsocket(productos) {
    const template = await fetch('/plantillas/productos.hbs')
    const textTemplate = await template.text()
    const functionTemplate = Handlebars.compile(textTemplate)

    const html = functionTemplate({ productos })
    document.getElementById('divLibros').innerHTML = html

}

async function renderizaInfoLogin(data) {

    const infoLogin = await fetch('/loginInfo')
    data = await infoLogin.json();
   
    const template = await fetch('/plantillas/infoLogin.hbs')
    const textTemplate = await template.text()
   
    
    const functionTemplate = Handlebars.compile(textTemplate)
  
    const html = functionTemplate({username: data.username})
    document.getElementById('divLogin').innerHTML = html

}






// escucha el formulario para agregar un nuevo productos y enviarlo via soccket
const agregarMensajes = document.getElementById('frmForo');
agregarMensajes.addEventListener('submit', (e) => {
    e.preventDefault();
    if (document.getElementById('emailUsuario').value == '') {
        notificaciones(`Debe completar los datos de usuario antes de agregar un mensaje`, 'red');
    } else {

        const mensaje = {

            author: {
                id: document.getElementById('emailUsuario').value,
                nombre: document.getElementById('nombre').value,
                apellido: document.getElementById('apellido').value,
                edad: document.getElementById('edad').value,
                alias: document.getElementById('alias').value,
                avatar: document.getElementById('avatar').value
            },
            text: document.getElementById('mensaje').value
        };
        /*
{ 
    "author": {
        "id": "david@", 
        "nombre": "David", 
        "apellido": "Leibovich", 
        "edad": "43", 
        "alias": "David654",
        "avatar": "https://st.depositphotos.com/1694341/4194/i/450/depositphotos_41943033-stock-photo-brad-pitt.jpg"
        },
    "text": "mensaje del usuario"
    }
        */
        // envia al server por socket para agregar un producto
        socket.emit('agregarMensaje', mensaje);
    }
});


// renderiza los mensajes 
async function renderizaMensajesWebsocket(mensajes) {
    const template = await fetch('/plantillas/mensajes.hbs')
    const textTemplate = await template.text()
    const functionTemplate = Handlebars.compile(textTemplate)
    let comprimido = JSON.stringify(mensajes).length;
    mensajes = desnormalizaMensajes(mensajes);
    let descomprimido = JSON.stringify(mensajes).length;
    let compresion = parseInt((comprimido * 100) / descomprimido);
    mensajes.map((e) => {
        let f = new Date(e.fecha)
        e.fecha = formatDate(f);

    });
    if(compresion >=100) compresion = 100;
    const html = functionTemplate({ mensajes });
    document.getElementById('divForo').innerHTML = html
    document.getElementById('compresion').innerHTML = `<b>${100 - compresion}% de compresion</b>`;
}

const formatDate = (date) => {
    let formatted_date = date.getDate() + "/" + parseInt(date.getMonth() + 1) + "/" + date.getFullYear() + " " + date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds()
    return formatted_date;
}


socket.on("login", (data) => {
    renderizaInfoLogin(data);
});

// escucha los productos emitidos
socket.on("productos", (data) => {
    data.sort((a, b) => b.id - a.id);
    renderizaProductosWebsocket(data);
    renderizaIFRAMEs();
  
});


// escucha los productos emitidos
socket.on("mensajes", (data) => {
    renderizaMensajesWebsocket(data);

});

// escucha quien agrego un producto
socket.on("agregadoPor", (data) => {
    notificaciones(`Nuevo producto agregado por: <br>
    <b>${data.agregadoPor}</b>`, 'green');
    // console.log(data)
});

// escucha quien agrego un producto
socket.on("agregadoPorMsg", (data) => {
    notificaciones(`Nuevo mensaje agregado por: <br>
    <b>${data.author.id}</b>`, 'green');
    // console.log(data)
});

// renderiza los igrames del entregable anterior
const renderizaIFRAMEs = () => {
    let iframe = document.getElementById('divLibrosHBS');
    iframe.src = iframe.src;
    iframe = document.getElementById('divLibrosPUG');
    iframe.src = iframe.src;
    iframe = document.getElementById('divLibrosEJS');
    iframe.src = iframe.src;

}

// funcion de notificacion a traves de la libreria Toastify
const notificaciones = (texto = 'Bienvenido', color = 'green', funcionClick = '') => {

    Toastify({
        text: texto,
        duration: 6000,
        close: true,
        gravity: "top", // `top` or `bottom`
        position: "right", // `left`, `center` or `right`
        stopOnFocus: true, // Prevents dismissing of toast on hover
        className: color,
        onClick: funcionClick // Callback after click
    }).showToast();
}
//const { schema, normalize, denormalize } = require("normalizr");
const autorSchema = new normalizr.schema.Entity('autores');
const mensajesEntity = new normalizr.schema.Entity('mensajes', {
    author: autorSchema
});
const normalizaMensajes = (mensajes) => {
    const normalizeData = normalizr.normalize(mensajes, [mensajesEntity]);
    return normalizeData;
    //let comprimido = JSON.stringify(normalizeData).length;
}
const desnormalizaMensajes = (mensajes) => {
    const desnormalizeData = normalizr.denormalize(mensajes.result, [mensajesEntity], mensajes.entities);
    console.log(desnormalizeData)
    return desnormalizeData;
    //let descomprimido = JSON.stringify(desnormalizeData).length;
}
