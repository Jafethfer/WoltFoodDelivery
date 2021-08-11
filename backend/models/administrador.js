var mongoose = require('mongoose')

var adminSchema = new mongoose.Schema({
    id: Number,
    firstName: String,
    lastName: String,
    phone: String,
    email: String,
    password: String,
    role: String
})

module.exports = mongoose.model('administradores',adminSchema)