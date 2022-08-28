// DTOs para mostrar en el chat
class ForoDTO {
    constructor(message) {
      this.id = message._id || message.id;
      //this._id = message._id;
      this.text = message.text;
      this.fecha = message.fecha;
      this.destino = message.q;
      this.author = {
        "id": message.author.id,
        "nombre": message.author.nombre,        
        "alias": message.author.alias,
        "avatar": message.author.avatar
      }
    }

    
  }

  class ForoClientesDTO {
    constructor(message) {
      this.nombre = message.author.nombre,
      this.email = message.author.id,
      this.alias = message.author.alias,
      this.avatar = message.author.avatar

    }
  }


class ForoBienvenidaDTO{
  default = () => {

    return {
     
      "fecha": Date.now(),
      "author": {
        "id": "admin@adminadmin.com",
        "nombre": "Administrador",
        "alias": "admin",
        "avatar": "/img/users/2272574-2.jpg"
      },
      "q": "",
      "text": "Bienvenido a nuestro centro de atención..."
    }

  }
}

  module.exports = { ForoDTO, ForoClientesDTO, ForoBienvenidaDTO };