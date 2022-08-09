class ForoDTO {
    constructor(message) {
      this.id = message.id;
      this.text = message.text;
      this.fecha = message.fecha;
      this.author = {
        "id": message.author.id,
        "nombre": message.author.apellido + ", " + message.author.nombre,
        "edad": message.author.edad,
        "alias": message.author.nombre,
        "avatar": message.author.avatar
      }
    }
  }

  module.exports = { ForoDTO };