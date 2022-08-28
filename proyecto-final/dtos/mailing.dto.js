// DTO para mostrar el cuerpo del email a enviar
class EmailingDTO {
    constructor() {
        this.fecha = Date.now();
    }

    FinalizarCompra = (orden, productos) => {
        let cuerpo_mail = 'Orden ID: ' + orden + '<br>';
        productos.forEach(producto => {
            cuerpo_mail += "-" + producto.nombre + '<br>';
        })

        return cuerpo_mail;
    };

    NuevoUsuario = (user) => {
        let cuerpo_mail = `
        <b>Perfil:</b> ${user.perfil} <br>
        <b>Nombre:</b> ${user.nombre} <br>
        <b>Username:</b> ${user.username} <br>
        <b>Email:</b> ${user.email} <br>
        <b>Direccion:</b> ${user.direccion} <br>
        <b>Telefono:</b> ${user.telefono} <br>
        <b>Edad:</b> ${user.edad} años <br> 
        <b>Avatar:</b> ${user.avatar} <br>         
        `;

        return cuerpo_mail;
    }



}

module.exports = { EmailingDTO };