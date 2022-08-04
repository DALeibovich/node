const mongoose = require("mongoose");

const collection = "Users"

const UserSchema = new mongoose.Schema({
    nombre: String,
    username: String,
    email: String,
    direccion: String,
    edad: Number,
    telefono: Number,
    password: String,
    avatar: String
})
const users = mongoose.model(collection, UserSchema)
module.exports = {
    users
} 
