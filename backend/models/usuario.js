var mongoose = require('mongoose')

var ordenSchema = new mongoose.Schema({
    id: String,
    productoId: String,
    nombreProducto: String,
    cantidad: Number,
    precio: Number,
    estado: String,
    motoristaId: Number,
    nombreMotorista: String
})

var usuarioSchema = new mongoose.Schema({
    id: Number,
    firstName: String,
    lastName: String,
    phone: String,
    email: String,
    password: String,
    role: String,
    pedidos: [ordenSchema]
})

module.exports = mongoose.model('usuarios',usuarioSchema)