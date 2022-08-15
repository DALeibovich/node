const mongoose = require("mongoose");

const collection = "Users"

const UserSchema = new mongoose.Schema({
    name: String,
    username: String,
    email: String,
    password: String
})
const users = mongoose.model(collection, UserSchema)
module.exports = {
    users
} 
