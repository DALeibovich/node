class ForoDTO {
    constructor(message) {
      this.id = message.id;
      this.text = message.text;
      this.fecha = Date();
      this.author = {
        "id": message.author.id,
        "nombre": message.author.apellido + ", " + message.author.nombre,
        "edad": message.author.edad,
        "alias": message.author.alias,
        "avatar": message.author.avatar
      }
    }
  }

  module.exports = { ForoDTO };