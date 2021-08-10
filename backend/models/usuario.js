var mongoose = require('mongoose')

var ordenSchema = new mongoose.Schema({
    nombreProducto: String,
    descripcion: String,
    cantidad: Number,
    precio: Number
})

var usuarioSchema = new mongoose.Schema({
    nombre: String,
    apellido: String,
    ordenes: [ordenSchema]
})

module.exports = mongoose.model('usuarios',usuarioSchema)