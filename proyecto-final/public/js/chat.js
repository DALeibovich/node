
        const socket = io.connect();

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
                        alias: document.getElementById('alias').value,
                        avatar: document.getElementById('avatar').value
                    },
                    q: document.getElementById('q').value,
                    text: document.getElementById('mensaje').value
                };
                
        
                // envia al server por socket para agregar un producto
                socket.emit('agregarMensaje', mensaje);
                document.getElementById('mensaje').value = '';
               
            }
        });
        


        const mensajeBienvenida = {
        
            author: {
                id: document.getElementById('emailUsuario').value,
                nombre: document.getElementById('nombre').value,        
                alias: document.getElementById('alias').value,
                avatar: document.getElementById('avatar').value
            },
            q: document.getElementById('q').value,
            text: ""
        };
        

        
        socket.emit('agregarMensaje', mensajeBienvenida);

        
        // renderiza los mensajes 
        async function renderizaMensajesWebsocket(mensajes) {
            const template = await fetch('/plantillas/mensajes.hbs')
            const textTemplate = await template.text()
            const functionTemplate =  Handlebars.compile(textTemplate)
            let comprimido = JSON.stringify(mensajes).length;
            mensajes = await desnormalizaMensajes(mensajes);
            //console.log(mensajes)
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
            let objDiv = document.getElementById("divForo");
            objDiv.scrollTop = objDiv.scrollHeight + 50;
        }
        
        const formatDate = (date) => {
            let formatted_date = date.getDate() + "/" + parseInt(date.getMonth() + 1) + "/" + date.getFullYear() + " " + date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds()
            return formatted_date;
        }
        
        
        
        
        // escucha los mensajes emitidos
        socket.on("mensajes", (data) => {
            renderizaMensajesWebsocket(data);         
        
        });
        
        
        
        // escucha quien agrego un producto
        socket.on("agregadoPorMsg", (data) => {
            notificaciones(`Nuevo mensaje agregado por: <br>
            <b>${data.author.id}</b>`, 'green');
            // console.log(data)
        });
        
 
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
            //console.log(desnormalizeData)
            return desnormalizeData;
            //let descomprimido = JSON.stringify(desnormalizeData).length;
        }
        